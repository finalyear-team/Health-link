
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
    previewUrl: "/image/placeholders/certification-placeholder.png",
  },
  {
    id: 2,
    title: "Certificate 2",
    previewUrl: "/image/placeholders/certification-placeholder.png",
  },
  {
    id: 3,
    title: "Certificate 3",
    previewUrl: "/image/placeholders/certification-placeholder.png",
  },
];

const Certificates = ({ value }: { value: string }) => {
  return (
    <TabsContent value={value}>
      <Card>
        {/* <div className="p-6 md:p-8 lg:p-10"> */}
        <CardHeader>
          <div className="flex justify-between">
            <span className="text-primary-700 font-medium">Certificates</span>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </div>
          <hr />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyData.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                title={certificate.title}
                previewUrl={certificate.previewUrl}
              />
            ))}
          </div>
        </CardContent>
        {/* </div> */}
      </Card>
    </TabsContent>
  );
};

export default Certificates;

function CertificateCard({ title, previewUrl, onDelete, onEdit }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <FilePenLine className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            color="secondary-600"
            onClick={onDelete}
          >
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
  );
}
