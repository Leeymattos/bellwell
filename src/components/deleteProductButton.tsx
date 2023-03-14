import { api } from '@/services/api';
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useRouter } from 'next/router';
import { Flip, toast } from 'react-toastify';

interface deleteProductButtonProps {
  setDeletingProductId: (id: string) => void
  id: string
}

export default function DeleteProductButton({ setDeletingProductId, id }: deleteProductButtonProps) {

  const router = useRouter();

  async function handleDeleteProduct(id: string) {
    try {
      const res = await api.delete(`/product/${id}`);

      router.replace(router.asPath);
      setDeletingProductId(id);

      toast.success('Produto excluído com sucesso!', {
        transition: Flip,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });

    } catch (error) {
      toast.error(`Produto não excluído, tente novamente!`, {
        transition: Flip,
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      console.log(error);
    }
  }

  return (

    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className='bg-red-500 h-10 p-2 rounded-lg text-white'>Excluir</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-zinc-800/70 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className='text-2xl leading-tight font-bold mt-1 mb-4'>
            Tem certeza absoluta?
          </AlertDialog.Title>

          <AlertDialog.Description className='text-zinc-500'>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse produto e removerá todos os dados.
          </AlertDialog.Description>

          <div className='flex justify-between mt-5'>
            <AlertDialog.Cancel asChild>
              <button className='bg-zinc-300 h-10 p-2 rounded-lg text-zinc-500 font-bold'>
                Cancelar
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                className='bg-red-300 h-10 p-2 rounded-lg text-red-700 font-bold'
                onClick={() => handleDeleteProduct(id)}
              >
                Sim, exluir porduto
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}