"use client";

import { StakeCard } from "@/components/commons/stakeCard";
import { StatusCard } from "@/components/commons/statusCard";
import { TaskCard } from "@/components/commons/taskCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, WalletIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { anvil } from "viem/chains";

const tasks: any[] = [
  {
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    createdAt: "25/01/2025",
    dueDate: "31/05/2025",
    stake: 100000000000000000,
  },
  {
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    createdAt: "25/01/2025",
    dueDate: "31/05/2025",
    stake: 100000000000000000,
  },
  {
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    createdAt: "25/01/2025",
    dueDate: "31/05/2025",
    stake: 100000000000000000,
  },
  {
    title: "Tarefa 4",
    description: "Descrição da tarefa 4",
    createdAt: "25/01/2025",
    dueDate: "31/05/2025",
    stake: 100000000000000000,
  },
];

export default function Home() {
  const [walletClient, setWalletClient] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const client = createWalletClient({
      chain: anvil,
      transport: custom((window as any).ethereum!),
    });

    setWalletClient(client);
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Please install a web3 wallet like MetaMask.");
      return;
    }

    const address = await walletClient.requestAddresses();
    setAddress(address);
  };

  const disconnectWallet = async () => {
    setAddress(null);
    // Optionally, you can also reset the wallet client or perform other cleanup actions
  };

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto pt-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Web3 TODO List</h1>
          <h2 className="text-sm text-muted-foreground">
            Gerencia suas atividades
          </h2>
        </div>
        {!address ? (
          <Button onClick={connectWallet} className="cursor-pointer">
            <WalletIcon />
            <span>Connect wallet</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {/* <span>{address}</span> */}
            <WalletIcon className="size-6" />
            <span className="text-sm text-muted-foreground">Connected</span>
            <Button onClick={disconnectWallet}>
              <XIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <StatusCard title="Total de tarefas" value={10} />
        <StatusCard title="Total de tarefas concluídas" value={3} />
        <StatusCard title="Total de tarefas pendentes" value={7} />
        <StatusCard title="Total de wei em stake" value={4000000000000000000} />
      </div>
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <Dialog>
          <DialogTrigger>
            <Button className="mt-4">
              <PlusIcon />
              <span>Nova Tarefa</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Tarefa</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4">
              <Label>Título</Label>
              <Input
                type="text"
                placeholder="Título da tarefa"
                className="mb-4"
              />
              <Label>Descrição</Label>
              <Textarea placeholder="Descrição da tarefa" className="mb-4" />
              <Label>Data de Vencimento</Label>
              <Input
                type="datetime-local"
                placeholder="Data de vencimento"
                className="mb-4"
              />
              <Label>Stake</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
                <StakeCard />
                <StakeCard />
                <StakeCard />
                <StakeCard />
              </div>
              <Button>
                <PlusIcon />
                <span>Criar Tarefa</span>
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h1 className="text-lg font-bold mb-4">
              Nenhuma tarefa encontrada
            </h1>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
              dueDate={task.dueDate}
              stake={task.stake}
            />
          ))
        )}
        {/* Example TaskCard, you can remove this after testing */}
        {/* <TaskCard
          title="Tarefa 1"
          description="Descrição da tarefa 1"
          createdAt="25/01/2025"
          dueDate="31/05/2025"
          stake={100000000000000000}
        /> */}
      </div>
    </div>
  );
}
