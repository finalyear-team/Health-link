import React from 'react'
import { LiaTimesSolid } from "react-icons/lia"

interface SelectedFilesListsProps {
    SelectedFiles: File[];
    formatBytes: (size: number) => string;
    handleFileRemove: (file: File) => void
}

const CertificateFileList = ({
    SelectedFiles,
    formatBytes,
    handleFileRemove
}: SelectedFilesListsProps) => {
    return (
        <div>
            {SelectedFiles && (
                <div className="text-gray-900 flex flex-col gap-5 w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full">
                        {SelectedFiles.map((file: File, i: any) => (
                            <div
                                key={i}
                                className={`border  p-2 flex gap-2 w-full`}
                            >
                                <button
                                    className={`text-sm text-white hover:bg-slate-50 rounded-full w-[20px] h-[20px] `}
                                    type="button"
                                    onClick={() => {
                                        handleFileRemove(file)
                                    }}
                                >
                                    <LiaTimesSolid />
                                </button>
                                <p className="text-gray-700 font-medium text-[12px]">
                                    {file.name.substring(0, 15) + "..."}
                                </p>

                                <p className="text-gray-700 text-[11px]">
                                    ({formatBytes(file.size)})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CertificateFileList