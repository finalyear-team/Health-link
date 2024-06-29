import { Dispatch, SetStateAction } from "react";

const fileTypes = {
    image: ['image/jpeg', 'image/png', 'image/jpg'],
    pdf: ['application/pdf'],
    document: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

export const validateFileType = (file: File | undefined): string | null => {
    if (file && fileTypes.image.includes(file.type)) {
        return 'image';
    } else if (file && fileTypes.pdf.includes(file.type)) {
        return 'pdf';
    } else if (file && fileTypes.document.includes(file.type)) {
        return 'document';
    } else {
        return null;
    }
};

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

export const validateFiles = (files: File[] | null | undefined, currentFile: File | undefined, setSelectedFiles: Dispatch<SetStateAction<File[] | null>>, setError: Dispatch<SetStateAction<string | null>>) => {

    const fileType = validateFileType(currentFile)

    if (!fileType) {
        setError("unsupported file!! please use only {pdf,jpg,png,jpg ,doc} file types")
        return
    }

    if (!files && !currentFile)
        return

    const currentFiles = files && Array.from(files).filter((file) => file.name != currentFile?.name && file.size != currentFile?.size)

    const selectedFiles = currentFile && currentFiles && currentFiles.concat(currentFile)

    const totalFileSize = selectedFiles?.reduce((totalSize, file) => {
        return totalSize + file.size
    }, 0)


    if (currentFile && currentFile.size > MAX_FILE_SIZE_BYTES) {
        setError("file size cannot exceed 20MB")
        return null
    }

    if (totalFileSize && totalFileSize > MAX_FILE_SIZE_BYTES) {
        setError("files size cann't exceed 20MB")
        return null
    }
    let validFiles: File[] = []

    if (!selectedFiles && currentFile) {
        validFiles.push(currentFile)
        setError("")
        setSelectedFiles(validFiles)
        return
    }
    else {
        setError("")
        setSelectedFiles(selectedFiles || null)
        return
    }




}