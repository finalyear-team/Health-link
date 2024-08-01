// import React from 'react'
// import { LiaTimesSolid } from "react-icons/lia"

// interface SelectedFilesListsProps {
//     SelectedFiles: File[];
//     formatBytes: (size: number) => string;
//     handleFileRemove: (file: File) => void
// }

// const CertificateFileList = ({
//     SelectedFiles,
//     formatBytes,
//     handleFileRemove
// }: SelectedFilesListsProps) => {
//     return (
//         <div>
//             {SelectedFiles && (
//                 <div className="text-gray-900 flex flex-col gap-5 w-full">
//                     <div className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full">
//                         {SelectedFiles.map((file: File, i: any) => (
//                             <div
//                                 key={i}
//                                 className={`border  p-2 flex gap-2 w-full`}
//                             >
//                                 <button
//                                     className={`text-sm text-white hover:bg-slate-50 rounded-full w-[20px] h-[20px] `}
//                                     type="button"
//                                     onClick={() => {
//                                         handleFileRemove(file)
//                                     }}
//                                 >
//                                     <LiaTimesSolid />
//                                 </button>
//                                 <p className="text-gray-700 font-medium text-[12px]">
//                                     {file.name.substring(0, 15) + "..."}
//                                 </p>

//                                 <p className="text-gray-700 text-[11px]">
//                                     ({formatBytes(file.size)})
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CertificateFileList
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { FaFilePdf, FaFileImage, FaFileAlt, FaFile } from "react-icons/fa";

interface SelectedFilesListsProps {
  SelectedFiles: File[];
  formatBytes: (size: number) => string;
  handleFileRemove: (file: File) => void;
  //   getFileIcon: (file: File) => React.ReactNode; // Function to get the file type icon
}

const getFileIcon = (file: File): React.ReactNode => {
  const fileType = file.type;
  if (fileType.includes("pdf")) {
    return <FaFilePdf className="text-red-500 text-2xl" />;
  } else if (fileType.includes("image")) {
    return <FaFileImage className="text-blue-500 text-2xl" />;
  } else if (fileType.includes("text")) {
    return <FaFileAlt className="text-yellow-500 text-2xl" />;
  } else {
    return <FaFile className="text-gray-500 text-2xl" />;
  }
};

const CertificateFileList = ({
  SelectedFiles,
  formatBytes,
  handleFileRemove,
}: //   getFileIcon,
SelectedFilesListsProps) => {
  return (
    <Card className="border-primary-600 rounded-bl-lg rounded-br-lg rounded-tl-none rounded-tr-none">
      {SelectedFiles && SelectedFiles.length > 0 ? (
        // <div className="flex flex-col gap-5">
        <div>
          {SelectedFiles.map((file: File, i: number) => (
            <CardContent
              key={i}
              className="flex items-center justify-center space-x-2"
            >
              {getFileIcon(file)}
              <div className="flex-grow">
                <div className="text-slate-700  truncate">{file.name}</div>
                <div className="text-slate-400  text-sm">
                  {formatBytes(file.size)}
                </div>
              </div>
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => handleFileRemove(file)}
              >
                <LiaTimesSolid />
              </Button>
            </CardContent>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center">No files selected</div>
      )}
    </Card>
  );
};

export default CertificateFileList;
