import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const HtmlParser = (html: any) => {
    console.log(html)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imageInputs: any = [];
    imgElements.forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        imageInputs.push(src);
    });
    return { imgElements, doc, imageInputs };
};

const serializer = (doc: any) => {
    console.log(doc)
    const serializer = new XMLSerializer();
    const p = doc.getElementsByTagName("body");
    const htmlstring = serializer.serializeToString(p[0]);
    const htmlString1 = htmlstring.replace(
        '<body xmlns="http://www.w3.org/1999/xhtml">',
        ""
    );
    const htmlString2 = htmlString1.replace("</body>", "");
    return htmlString2;
};

const dataURLtoBlob = (dataURI: any) => {
    console.log(dataURI)
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
};

export const uploadEditorImageToFirebase = async (base64Data: any) => {
    return new Promise((resolve, reject) => {
        const profileRef = ref(
            storage,
            `EditorImage/${new Date().getMilliseconds()}`
        );
        const file = dataURLtoBlob(base64Data);
        const uploadTask = uploadBytesResumable(profileRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    Math.round(
                        ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5
                    ) * 5;
                console.log(progress)
            },
            (Error) => {
                switch (Error.code) {
                    case "storage/unauthorized":
                        console.log(Error)
                        break;
                    case "storage/canceled":
                        console.log(Error)
                        break;
                    case "storage/unknown":
                        console.log(Error)
                        break;
                }
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);

                    resolve(url);
                } catch (e: any) {
                    reject(e);
                }
            }
        );
    });
};

export const handleHtmlContent = async (Description: string) => {
    console.log("html content")
    const { doc, imageInputs, imgElements } = HtmlParser(Description);
    console.log(doc, imageInputs, imageInputs)
    const url = await imageInputs.map(async (byte: any) => {
        if (byte.includes("https://firebasestorage.googleapis.com/")) return byte;
        try {
            const response = await uploadEditorImageToFirebase(byte);
            return response;
        } catch (e) {
            throw new Error("something wrong please try again");
        }
    });
    const urls = await Promise.all(url);
    imgElements.forEach(async (img: HTMLImageElement, i: number) => {
        img.setAttribute("src", urls[i]);
    });
    const html = serializer(doc);

    return html;
};