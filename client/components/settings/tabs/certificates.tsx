"use client";
import { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import CertificateCard from "../ui/CertificateCard";
import { uploadFile } from "@/utils/fileUpload";
import useAuth from "@/hooks/useAuth";
import useUserStore from "@/store/userStore";
import { GET_SIGNEDIN_USER, GET_USER } from "@/graphql/queries/userQueries";
import { ref } from "firebase/storage";

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
  const { user } = useAuth()
  const { data: userDetail, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      UserID: user?.UserID
    }
  })
  const { EducationalBackground, setEducationalBackGround } = useUserStore()
  const { toast } = useToast();
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState<number | null | any>()
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      refetch()
      setOpen(false)
    }
  });
  const [certificate, setCertificate] = useState<any[]>()

  useEffect(() => {
    if (!userDetail && !userDetail?.GetUser?.EducationalBackground)
      return

    const AdditionalCertificate = JSON.parse(userDetail?.GetUser?.EducationalBackground)?.AdditionalCertifications

    setCertificate(AdditionalCertificate?.map((certificate: any) => {
      const info = JSON.parse(certificate)
      return {
        certificateId: info?.certificateId,
        name: info.name,
        previewUrl: info.file,
        issueDate: info.issueDate,
        description: info.description
      }
    }))



  }, [userDetail])

  const handleCertificateSubmit = async (values: any) => {
    console.log(values, certificateFile);

    try {
      if (!certificateFile)
        return
      const certificateUrl = await uploadFile(certificateFile, "certification", setProgress)
      console.log(certificateUrl)

      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            UserID: user?.UserID,
            DoctorDetails: {
              EducationalBackground: {
                ...EducationalBackground,
                AdditionalCertifications: [JSON.stringify({
                  name: values.name,
                  file: certificateUrl,
                  description: values.description,
                  issueDate: new Date(values.issueDate),
                  certificateId: values.certificateId,
                })]
              }
            }


            //
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


  console.log(certificate)


  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <span className="text-primary-700 font-medium">Certificates</span>

            <div className="flex items-center justify-between">
              <CertificateDialog open={open} setOpen={setOpen}
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
              {EducationalBackground && EducationalBackground.AdditionalCertifications.length.map((certificate: any) => (
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
                  onEdit={() => { }}
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
