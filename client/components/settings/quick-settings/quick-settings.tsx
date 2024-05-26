import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settingsOptions = [
  { id: "showNotifications", label: "Show Notifications" },
  { id: "showPatientList", label: "Show Patient List" },
  { id: "showAppointmentCalendar", label: "Show Appointment Calendar" },
  { id: "showTaskList", label: "Show Task List" },
];

const QuickSettings: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard Settings</h2>
      <ul>
        {settingsOptions.map((option) => (
          <li
            key={option.id}
            className="flex items-center space-x-4 justify-between mb-2"
          >
            <Label htmlFor={`${option.label}`}>{option.label}</Label>
            <div className="flex items-center space-x-2">
              <Switch id={`${option.label}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickSettings;
