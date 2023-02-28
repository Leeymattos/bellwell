import { api } from "@/services/api";
import { Room } from "@prisma/client"

import { FormEvent, useState } from "react"
import { toast, Flip } from "react-toastify";

type NewProductProps = {
  rooms: Room[]
}

export function NewProduct({ rooms }: NewProductProps) {

  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [nameProduct, setNameProduct] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [urlImage, setUrlImage] = useState<string>('');

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post('/product', {
        name: nameProduct,
        description,
        link,
        image_url: urlImage,
        room_id: selectedRoom
      })

      console.log(res)

      toast.success('Produto adicionado com sucesso!', {
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

      setDescription('');
      setNameProduct('');
      setSelectedRoom('');
      setLink('');
      setUrlImage('');



    } catch (e) {
      toast.error('Produto não cadastrado, tente novamente!', {
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
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className='mb-4'>
        <label htmlFor='comodos' className='block text-zinc-700 text-sm font-bold mb-2'>Qual comodo pertence o produto?</label>
        <select
          id="comodos"
          className="shadow  border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e => setSelectedRoom(e.target.value)}
          value={selectedRoom}
        >
          <option selected value='0'>Comodos</option>
          {rooms.map(room => {
            return (
              <option
                key={room.id}
                value={room.id}
              >
                {room.name}
              </option>
            )
          })}
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='name' className='block text-zinc-700 text-sm font-bold mb-2'>Nome do produto</label>
        <input
          type="text"
          id='name'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline'
          value={nameProduct}
          onChange={e => setNameProduct(e.target.value)}
        />
      </div>
      <div className='mb-4'>

        <label htmlFor='description' className='block text-zinc-700 text-sm font-bold mb-2'>Descrição</label>
        <input
          type="text"
          id='description'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className='mb-4'>

        <label htmlFor='link' className='block text-zinc-700 text-sm font-bold mb-2'>Link da loja</label>
        <input
          type="text"
          id='link'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline'
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </div>

      <div className='mb-4'>

        <label htmlFor='urlImage' className='block text-zinc-700 text-sm font-bold mb-2'>Url da imagem</label>
        <input
          type="text"
          id='urlImage'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline'
          value={urlImage}
          onChange={e => setUrlImage(e.target.value)}
        />
      </div>

      <div className="mt-5 mb-2 text-center">
        <button
          type="submit"
          className="bg-emerald-600 h-10 p-2 rounded-lg text-white"
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}