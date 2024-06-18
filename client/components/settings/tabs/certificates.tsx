// import React, { useState } from 'react';
// import { PlusCircleIcon, TrashIcon } from 'lucide-react';

// interface Certificate {
//   id: number;
//   name: string;
//   previewUrl: string;
// }

// interface CertificateProps {
//   certificates: Certificate[];
//   onAddCertificate: () => void;
//   onDeleteCertificate: (id: number) => void;
//   onRenameCertificate: (id: number, newName: string) => void;
// }

// const dummyData = [
//   {
//     id: 1,
//     title: "Certificate 1",
//     previewUrl: "/image/placeholders/certification-placeholder.png"
//   },
//   {
//     id: 2,
//     title: "Certificate 2",
//     previewUrl: "/image/placeholders/certification-placeholder.png"
//   },
//   {
//     id: 3,
//     title: "Certificate 3",
//     previewUrl: "/image/placeholders/certification-placeholder.png"
//   },
// ]

// const Certificates: React.FC<CertificateProps> = ({
//   certificates,
//   onAddCertificate,
//   onDeleteCertificate,
//   onRenameCertificate,
// }) => {
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [newName, setNewName] = useState<string>('');

//   const handleStartEditing = (id: number, name: string) => {
//     setEditingId(id);
//     setNewName(name);
//   };

//   const handleCancelEditing = () => {
//     setEditingId(null);
//     setNewName('');
//   };

//   const handleSaveName = (id: number) => {
//     if (newName.trim() !== '') {
//       onRenameCertificate(id, newName);
//       setEditingId(null);
//       setNewName('');
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {dummyData.map((certificate) => (
//         <div key={certificate.id} className="flex items-center space-x-4">
//           <img src={certificate.previewUrl} alt={certificate.title} className="w-32 h-32 object-cover rounded-lg shadow-md" />
//           <div className="flex-1">
//             {editingId === certificate.id ? (
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={newName}
//                   onChange={(e) => setNewName(e.target.value)}
//                   className="border-b-2 border-gray-300 outline-none focus:border-blue-500 flex-1"
//                 />
//                 <button
//                   className="text-blue-500 hover:text-blue-700"
//                   onClick={() => handleSaveName(certificate.id)}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={handleCancelEditing}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <p className="text-lg font-semibold">{certificate.title}</p>
//                 <button
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => handleStartEditing(certificate.id, certificate.title)}
//                 >
//                   Rename
//                 </button>
//                 <button
//                   className="text-red-500 hover:text-red-700"
//                   onClick={() => onDeleteCertificate(certificate.id)}
//                 >
//                   <TrashIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//       <div className="flex items-center space-x-4">
//         <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-200 cursor-pointer">
//           <PlusCircleIcon className="w-10 h-10 text-gray-400 hover:text-blue-500" onClick={onAddCertificate} />
//         </div>
//         <p className="text-gray-500">Add Certificate</p>
//       </div>
//     </div>
//   );
// };

// export default Certificates;

import { Button } from "@/components/ui/button";
import { Plus, Trash2, FilePenLine } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

const dummyData = [
  {
    id: 1,
    title: "Certificate 1",
    previewUrl: "/image/placeholders/certification-placeholder.png"
  },
  {
    id: 2,
    title: "Certificate 2",
    previewUrl: "/image/placeholders/certification-placeholder.png"
  },
  {
    id: 3,
    title: "Certificate 3",
    previewUrl: "/image/placeholders/certification-placeholder.png"
  },
]

const Certificates = ({ value }: { value: string }) => {
  return (
    <TabsContent value={value}>
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="text-2xl font-bold text-primary-600">
                Certificates
              </h1>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {dummyData.map((certificate) => <CertificateCard key={certificate.id} title={certificate.title} previewUrl={certificate.previewUrl}/>)}
          </div>
        </div>
    </TabsContent>
  );
};

export default Certificates;


function CertificateCard ({title, previewUrl, onDelete, onEdit}: any) {
 return (
  <Card >
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onEdit}>
        <FilePenLine className="w-4 h-4 mr-2" />
        Edit
      </Button>
      <Button variant="outline" size="sm" color="secondary-600" onClick={onDelete}>
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4">
      <Image
        src={previewUrl}
        alt="Certificate"
        width={120}
        height={160}
        className="rounded-md"
      />
    </div>
  </CardContent>
</Card>
 )
}