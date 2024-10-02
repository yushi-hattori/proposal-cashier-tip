"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomTipScreen from "./custom-tip-screen";
import MainScreen from "./main-screen";
import Image from "next/image";

export function ProposalTipScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();
    const year = now.getFullYear();
    const amount = parseFloat(`${month}${day}.${year.toString().slice(-2)}`);
    setTotalAmount(amount);
  }, []);

  const calculateTip = (percentage: number) => {
    return (totalAmount * percentage) / 100;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 relative">
      <Image
        alt="namu-cooking"
        src={"/namu-cooking.jpg"}
        width={500}
        height={500}
        className="w-full rounded-xl absolute z-0 opacity-80"
      />
      <h1 className="z-10 rounded text-3xl font-bold mb-2 text-center">
        Leave a tip?
      </h1>
      {showCustomTip ? (
        <CustomTipScreen
          setShowCustomTip={setShowCustomTip}
          calculateTip={calculateTip}
          setModalMessage={setModalMessage}
          setIsModalOpen={setIsModalOpen}
          setSelectedTip={setSelectedTip}
        />
      ) : (
        <MainScreen
          setModalMessage={setModalMessage}
          setIsModalOpen={setIsModalOpen}
          totalAmount={totalAmount}
          calculateTip={calculateTip}
          setShowCustomTip={setShowCustomTip}
          setSelectedTip={setSelectedTip}
        />
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yoko's Thoughts</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row items-center ">
            <Image
              alt="namu"
              // src={!selectedTip ? "/namu-crying.jpg" : selectedTip < 20 ? "/namu-crying.jpg" : selectedTip < 25 ? "/namu-counting.webp"}
              src={
                !selectedTip || selectedTip < 10
                  ? "/namu-angry.gif"
                  : selectedTip < 20
                  ? "/namu-crying.jpg"
                  : selectedTip < 25
                  ? "/namu-counting.webp"
                  : selectedTip < 50
                  ? "/namu-happy.jpg"
                  : selectedTip < 75
                  ? "/namu-wavy.jpg"
                  : "/namu-headpat.jpg"
              }
              width={200}
              height={200}
              className="rounded-xl pe-3"
            />
            <DialogDescription className="border text-md border-black rounded p-3 h-full flex items-center justify-center text-center">
              {modalMessage}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
