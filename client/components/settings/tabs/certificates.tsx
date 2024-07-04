"use client";
import { useState } from "react";
import { Scroll } from "lucide-react";
import { validateCertificateInputs } from "@/utils/validationSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import CertificateDialog from "../ui/CertificateDialog";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import CertificateCard from "../ui/CertificateCard";

interface Certificate {
  id: string;
  name: string;
  previewUrl: string;
  issueDate: Date;
  description: string;
}

const dummyData: Certificate[] = [
  // {
  //   id: "1",
  //   name: "Certificate of Achievement",
  //   previewUrl: "/image/placeholders/certification-placeholder.png",
  //   issueDate: new Date("2023-05-15"),
  //   description: "Awarded for outstanding performance in academics.",
  // },
  // {
  //   id: "2",
  //   name: "Professional Development Certificate",
  //   previewUrl: "/image/placeholders/certification-placeholder.png",
  //   issueDate: new Date("2022-09-20"),
  //   description:
  //     "Recognition of completion of a professional development course.",
  // },
  // {
  //   id: "3",
  //   name: "Leadership Excellence Certificate",
  //   previewUrl: "/image/placeholders/certification-placeholder.png",
  //   issueDate: new Date("2024-01-10"),
  //   description:
  //     "Acknowledgment of exceptional leadership skills demonstrated.",
  // },
];

const Certificates = ({ value }: { value: string }) => {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [updateUser] = useMutation(UPDATE_USER);

  const handleCertificateSubmit = async (values: any) => {
    console.log(values, certificateFile);
    // values.name, values.description,values.issueDate,value.imageURL
    try {
      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            // e
          },
        },
      });
      console.log("Updated user:", data);
      // show toast
      toast({
        title: "Certificate Added",
        variant: "success",
        description: "Your Certificate has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating the Certificate",
        description: "Error updating the Certificate, Please try again!",
        variant: "destructive",
      });
      console.error("Error updating user:", error);
    }
  };

  const certInitialValues = {
    name: certificateFile?.name.split(".").slice(0, -1).join(".") || "",
    description: "",
    issueDate: new Date(""),
    certificateId: "",
  };

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <span className="text-primary-700 font-medium">Certificates</span>

            <div className="flex items-center justify-between">
              <CertificateDialog
                type="create"
                initialValues={certInitialValues}
                onSubmit={handleCertificateSubmit}
                certificateFile={certificateFile}
                setCertificateFile={setCertificateFile}
                validateCertificateInputs={validateCertificateInputs}
              />
            </div>
          </div>
          <hr />
        </CardHeader>
        <CardContent>
          {dummyData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dummyData.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificateId={certificate.id}
                  name={certificate.name}
                  previewUrl={certificate.previewUrl}
                  issueDate={certificate.issueDate}
                  description={certificate.description}
                  validateCertificateInputs={validateCertificateInputs}
                  onDelete={() => {
                    toast({
                      title: "Delete",
                      description: "Coming Soon.",
                      variant: "destructive",
                    });
                  }}
                  onEdit={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full space-y-2">
              <Scroll className="w-10 h-10 text-slate-500" />
              <CardDescription>No Certificate.</CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Certificates;
