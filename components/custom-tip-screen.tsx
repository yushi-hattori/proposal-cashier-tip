import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

interface CustomTipScreenProps {
  setShowCustomTip: Dispatch<SetStateAction<boolean>>;
  calculateTip: (percentage: number) => number;
  setModalMessage: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTip: Dispatch<SetStateAction<number | null>>;
}

const CustomTipScreen = ({
  setShowCustomTip,
  calculateTip,
  setModalMessage,
  setIsModalOpen,
  setSelectedTip,
}: CustomTipScreenProps) => {
  const [customTip, setCustomTip] = useState<string>("");

  const getCustomTipMessage = (percentage: number) => {
    if (percentage <= 0)
      return "Zero? Did you accidentally click that? Or do you want the divorce papers already? 😠";
    if (percentage <= 10)
      return "Under 10%? I hope you understand we're together for life 😤😤";
    if (percentage <= 20)
      return "Getting warmer? Still hurts 😭 I got bills to pay 😭";
    if (percentage <= 30)
      return "Alright alright, I see you, I seeee youuuu 👀";
    if (percentage <= 40) return "You actually do love me 🥺🥺";
    if (percentage <= 50)
      return "I knew you were the one! I knew you loved me! You're the girl I'm going to marry! 💍";
    if (percentage <= 75)
      return "Alright now I know you're just pandering me. Thanks though 😘";
    return "I know you don't have that kind of money. But love you anyway ❤️";
  };

  const handleCustomTip = () => {
    const tipPercentage = parseFloat(customTip);
    if (isNaN(tipPercentage) || tipPercentage < 0) {
      setModalMessage("Stop joshing around~~~?");
    } else {
      setSelectedTip(tipPercentage);
      setModalMessage(getCustomTipMessage(tipPercentage));
    }
    setIsModalOpen(true);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d*)?$/.test(value)) {
      setCustomTip(value);
    }
  };

  return (
    <div className="z-10 bg-gray-100 p-5 rounded-xl">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => setShowCustomTip(false)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Input
        key="input-box"
        type="text"
        inputMode="decimal"
        placeholder="Enter custom tip %"
        value={customTip}
        onChange={handleCustomTipChange}
        className="mb-4"
        aria-label="Custom tip percentage"
      />
      <div className="text-center mb-4">
        Tip amount: $
        {customTip ? calculateTip(parseFloat(customTip)).toFixed(2) : "0.00"}
      </div>
      <Button onClick={handleCustomTip} className="w-full">
        Apply Custom Tip
      </Button>
    </div>
  );
};

export default CustomTipScreen;
