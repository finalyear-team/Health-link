import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import CertificateDialog from "./CertificateDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";

const CertificateCard = ({
  certificateId,
  name,
  previewUrl,
  issueDate,
  description,
  onDelete,
  onEdit,
  validateCertificateInputs,
}: {
  certificateId: string;
  name: string;
  previewUrl: string;
  issueDate: Date;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
  validateCertificateInputs: any;
}) => {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [updateUser] = useMutation(UPDATE_USER);

  const handleCertificateEdit = async (values: any) => {
    console.log(values, certificateFile);
    // values.name, values.description,values.issueDate,value.imageURL
    try {
      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            //
          },
        },
      });
      console.log("Updated user:", data);
      // show toast
      toast({
        title: "Certificate Updated",
        variant: "success",
        description: "Your Certificate has been updated successfully",
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
  return (
    <Card>
      <CardHeader>
        <Image
          src={previewUrl}
          alt="Certificate"
          width={120}
          height={160}
          className="w-full"
        />
      </CardHeader>

      <CardContent>
        <CardTitle className="text-xl">{name}</CardTitle>
        <hr className="border dark:border-slate-500 border-slate-300 mb-2" />
        <CardDescription>{description}</CardDescription>
        <div className="text-xs italic my-3">
          Issue Date: {issueDate.toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <CertificateDialog
            type="edit"
            initialValues={{
              name,
              description,
              issueDate: issueDate.toISOString().split("T")[0], // formatting the issueDate 'yyyy-mm-dd'
              certificateId,
            }}
            onSubmit={handleCertificateEdit}
            certificateFile={certificateFile}
            setCertificateFile={setCertificateFile}
            validateCertificateInputs={validateCertificateInputs}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
