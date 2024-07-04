"use client";
import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, TriangleAlert, FilePenLine } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CertificateDialogProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  certificateFile: File | null;
  setCertificateFile: (file: File | null) => void;
  validateCertificateInputs: any;
  type: string;
}

const CertificateDialog = ({
  initialValues,
  onSubmit,
  certificateFile,
  setCertificateFile,
  validateCertificateInputs,
  type,
}: CertificateDialogProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setCertificateFile(acceptedFiles[0]);
    },
    [setCertificateFile]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });

  return (
    <Dialog>
      {type === "create" ? (
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </DialogTrigger>
      ) : type === "edit" ? (
        <DialogTrigger asChild>
          <Button variant={"ghost"} size="sm">
            <FilePenLine className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </DialogTrigger>
      ) : (
        ""
      )}
      <DialogContent className="sm:max-w-[500px]">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validateCertificateInputs}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="space-y-6" action="#" method="POST">
              <DialogHeader>
                {type === "create" && (
                  <DialogTitle>Add Certificate</DialogTitle>
                )}
                {type === "edit" && <DialogTitle>Edit Certificate</DialogTitle>}
                <DialogDescription>
                  Upload or drag and drop your certificate, then add a name and
                  description.
                </DialogDescription>
                <div
                  {...getRootProps()}
                  className={`border-dashed border-2 p-6 mb-4 text-center mt-3 ${
                    isDragAccept
                      ? "border-secondary-600 dark:border-secondary-700"
                      : isDragReject
                      ? "border-red-600 dark:border-red-700"
                      : "dark:border-slate-500 border-slate-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragReject && (
                    <span className="text-sm text-red-600 flex">
                      <TriangleAlert className="w-5 h-5 mr-2" /> This file is
                      not in the correct format(.png, .jpg, .jpeg)
                    </span>
                  )}

                  {isDragActive ? (
                    isDragAccept && <span>Drop the Certificate here ...</span>
                  ) : certificateFile ? (
                    <div className="flex justify-between items-center">
                      <p>{certificateFile.name}</p>
                      <Button
                        onClick={() => setCertificateFile(null)}
                        variant={"ghost"}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8" />
                      <div className="mt-2 text-sm">
                        Drag and drop your certificate or{" "}
                        <span className="font-medium underline cursor-pointer mr-1">
                          browse.
                        </span>
                        <p className="italic text-xs mt-2">
                          only Image(.png, .jpg, .jpeg) format is allowed
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Input
                    label="Certificate ID"
                    type="text"
                    name="certificateId"
                    placeholder="E.g. 10231"
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    label="Date of Issuance"
                    type="date"
                    name="issueDate"
                    placeholder="E.g. 21/3/2024"
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="E.g. Certificate in Clinical Excellence"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Field
                    id="description"
                    name="description"
                    as={Textarea}
                    placeholder="E.g. This certificate is awarded to recognize the completion of a rigorous medical education program."
                    className="max-h-[120px]"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="input__error"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!certificateFile || !isValid}>
                  Save
                </Button>

                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDialog;
