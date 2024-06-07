"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/container/container";
import TopDoctors from "@/components/Landing-common/TopDoctors";
import { Button } from "@/components/ui/button";
import { MdOutlineSavedSearch } from "react-icons/md";
import SpecializationPopover from "@/components/form/popOver/SpecializationPopover";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import { search, filter, sort } from "@/utils/actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import users from "@/public/data/users";
import useAppointmentStore from "@/store/appointmentStore";
import { Loader2 } from "lucide-react";
import AppointmentForm from "@/components/form/appointment/appointment-form";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS } from "@/graphql/queries/userQueries";

type SortOrder = "ascending" | "descending";

const Consultation = () => {
  const [specializationValue, setSpecializationValue] = useState("");
  const [criteria, setCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");
  const [noValue, setNoValue] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);

  // cancel the appointment form
  const cancelAppointmentForm = useAppointmentStore(
    (state) => state.cancelAppointmentForm
  );
  
  // to check whether the doctor is selected or not

  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);

  const handleCriteriaChange = (value: any) => {
    setCriteria(value);
  };

  const handleSortOrderChange = (value: any) => {
    setSortOrder(value);
  };

  const handleFilterAndSort = (searchValue = "") => {
    let resultUsers = users;

    // Search by name
    if (searchValue) {
      resultUsers = search(resultUsers, searchValue);
    }

    // Filter by specialization
    if (specializationValue) {
      resultUsers = filter(
        resultUsers,
        (user) => user.specialization === specializationValue
      );
    }

    // Sort users
    if (criteria) {
      resultUsers = sort(resultUsers, criteria, sortOrder);
    }

    setFilteredUsers(resultUsers);
    setNoValue(resultUsers.length === 0);
  };

  useEffect(() => {
    handleFilterAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specializationValue, criteria, sortOrder]);

  const initialValues = {
    searchByName: "",
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    handleFilterAndSort(values.searchByName);
    setSubmitting(false);
  };

  return (
    <Container>
      {!selectedDoctor ? (
        <div>
          {/* header */}
          <div className="flex justify-center items-center flex-col">
            <div className="flex text-6xl font-bold text-center space-x-3">
              Meet Our <h1 className="text-primary-600 pl-2"> Doctors </h1>{" "}
            </div>
            <p className="font-medium text-lg my-3">
              Explore our dedicated team of doctors ready to provide
              personalized care tailored to your needs.
            </p>
            <Button variant={"secondary"}>
              <MdOutlineSavedSearch size={20} /> Advanced Search by Symptoms
            </Button>
          </div>
          {/* search and filter */}

          <div className="flex justify-center items-center space-x-5 mt-4">
            <div>
              <SpecializationPopover
                specializationValue={specializationValue}
                setSpecializationValue={setSpecializationValue}
              />
            </div>
            <div>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isValid, isSubmitting }) => (
                  <Form className="flex justify-between items-center space-x-5">
                    <div>
                      <Field
                        as={Input}
                        placeholder="Search by name"
                        name="searchByName"
                        type="text"
                      />
                    </div>
                    <div>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Search
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div>
              <Select onValueChange={handleCriteriaChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Criterias</SelectLabel>
                    <SelectItem value="rating"> Rating</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="specialty">Specialty</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="hourlyRate">Hourly Rate</SelectItem>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="mt-4">
                    <SelectLabel>Type</SelectLabel>
                    <RadioGroup
                      defaultValue="ascending"
                      onChange={handleSortOrderChange}
                    >
                      <div className="flex items-center space-x-2 my-2 cursor-pointer">
                        <RadioGroupItem value="ascending" id="r1" />
                        <Label htmlFor="r1">Ascending</Label>
                      </div>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="descending" id="r2" />
                        <Label htmlFor="r2">Descending</Label>
                      </div>
                    </RadioGroup>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* list of doctors */}
          {noValue ? (
            <div>No results found</div>
          ) : (
            <TopDoctors items={filteredUsers} />
          )}
        </div>
      ) : (
        <Container>
          <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
            Book an Appointment
          </h2>
          <AppointmentForm />
        </Container>
      )}
    </Container>
  );
};

export default Consultation;
