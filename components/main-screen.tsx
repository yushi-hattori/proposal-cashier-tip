import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface MainScreenProps {
  setModalMessage: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  totalAmount: number;
  calculateTip: (percentage: number) => number;
  setShowCustomTip: Dispatch<SetStateAction<boolean>>;
  setSelectedTip: Dispatch<SetStateAction<number | null>>;
}

const MainScreen = ({
  setModalMessage,
  setIsModalOpen,
  totalAmount,
  calculateTip,
  setShowCustomTip,
  setSelectedTip,
}: MainScreenProps) => {
  const tipMessages = {
    0: "No tip? I guess you don't want this ring...",
    15: "15%? So I guess you don't love me",
    20: "20%? I guess 20% is industry standard... I guess I'm just good enough for 20%",
    25: "25%? I knew you loved me! Thats why I love you! Although... there is the custom option 👀",
  };

  const handleTipSelection = (percentage: number) => {
    setSelectedTip(percentage);
    setModalMessage(tipMessages[percentage as keyof typeof tipMessages]);
    setIsModalOpen(true);
  };
  return (
    <div className="z-10 w-8/12 flex flex-col items-center">
      <div
        className="text-3xl font-bold text-center mb-6 flex justify-center w-6/12 items-end"
        aria-label="Total amount"
      >
        <span className="opacity-80 bg-gray-300 border-2 shadow-lg rounded-xl px-5 py-2">
          ${totalAmount.toFixed(2)}
        </span>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 mb-3">
        {[15, 20, 25].map((percentage) => (
          <Button
            key={percentage}
            variant="outline"
            className="opacity-80 h-24 text-2xl font-bold flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
            onClick={() => handleTipSelection(percentage)}
          >
            <span>{percentage}%</span>
            <span className="text-sm font-normal mt-2">
              ${calculateTip(percentage).toFixed(2)}
            </span>
          </Button>
        ))}
      </div>
      <div className="w-full grid grid-flow-col gap-4">
        <Button
          variant="outline"
          className="w-full opacity-80"
          onClick={() => handleTipSelection(0)}
        >
          No Tip
        </Button>
        <Button
          variant="outline"
          className="w-full opacity-80"
          onClick={() => setShowCustomTip(true)}
        >
          Custom
        </Button>
      </div>
    </div>
  );
};

export default MainScreen;
