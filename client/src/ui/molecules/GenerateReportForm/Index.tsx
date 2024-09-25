import React, { FormEvent, useState } from "react";
import { UserInfo } from "../../../types";
import SiteWrapper from "../SiteWrapper/Index";
import Title from "../../atoms/Typography/Title/Index";
import InputField from "../../atoms/InputField/Index";
import { generateRandomString } from "../../../utils/generateRandomString";
import Button from "../../atoms/Button/Index";

const GenerateReportForm: React.FC<{
  onSubmit: (userInfo: UserInfo) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    companyName: "",
    revenue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-overlay">
      <SiteWrapper className="grow shrink-0">
        <div className="w-full bg-white p-16 rounded-sm">
          <Title className="font-garamond text-center mb-8">
            Almost there!
          </Title>
          <form
            className="grid grid-cols-2 gap-x-8 gap-y-6"
            onSubmit={handleSubmit}
          >
            <InputField
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
              label="Your Name"
              id={generateRandomString()}
            />
            <InputField
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              label="Your Email"
              id={generateRandomString()}
            />
            <InputField
              type="text"
              name="companyName"
              value={userInfo.companyName}
              onChange={handleChange}
              required
              label="Your Company"
              id={generateRandomString()}
            />
            <InputField
              type="text"
              name="revenue"
              value={userInfo.revenue}
              onChange={handleChange}
              required
              label="Annual Revenue ($)"
              id={generateRandomString()}
            />
            <Button className="ml-auto w-1/2 mt-10">Generate Report</Button>
            <Button
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                event.preventDefault();
                onClose();
              }}
              className="bg-grey text-light-grey mr-auto w-1/2 mt-10"
            >
              Cancel
            </Button>
          </form>
        </div>
      </SiteWrapper>
    </div>
  );
};

export default GenerateReportForm;
