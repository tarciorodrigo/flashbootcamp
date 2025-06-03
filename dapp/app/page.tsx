import { StatusCard } from "@/components/commons/statusCard";
import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto pt-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Web3 TODO List</h1>
          <h2 className="text-sm text-muted-foreground">Gerencia suas atividades</h2>
        </div>
        <Button>
          <WalletIcon />
          <span>
            Connect wallet
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <StatusCard />
        <StatusCard />
        <StatusCard />
        <StatusCard />
      </div>
    </div>
  );
}
