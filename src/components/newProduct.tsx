import { api } from "@/services/api";
import { Room } from "@prisma/client"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { toast, Flip } from "react-toastify";
import { useRouter } from 'next/router'

type NewProductProps = {
  rooms: Room[]
}

interface ValuesForm {
  selectedRoom: string;
  nameProduct: string;
  description: string;
  storeLink: string;
  urlImage: string;
}

export function NewProduct({ rooms }: NewProductProps) {

  const router = useRouter();

  const CreateProductShema = Yup.object().shape({
    selectedRoom: Yup.string()
      .min(2, 'Necessário escolher um comodo')
      .required('Necessário escolher um comodo'),
    nameProduct: Yup.string()
      .min(4, 'Nome menor do que o esperado')
      .max(150, 'Nome maior do o esperado')
      .required('Campo obrigatório'),
    description: Yup.string()
      .min(5, 'Nome menor do que o esperado')
      .max(150, 'Nome maior do o esperado')
      .required('Campo obrigatório'),
    storeLink: Yup.string()
      .min(5, 'Nome menor do que o esperado')
      .required('Campo obrigatório'),
    urlImage: Yup.string()
      .min(5, 'Nome menor do que o esperado')
      .required('Campo obrigatório')
  })

  async function handleSubmitForm(values: ValuesForm) {
    try {
      const res = await api.post('/product', {
        name: values.nameProduct,
        description: values.description,
        link: values.storeLink,
        image_url: values.urlImage,
        room_id: values.selectedRoom
      });

      router.replace(router.asPath);

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

      return res.status

    } catch (error) {
      toast.error(`Produto não cadastrado, tente novamente!`, {
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
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{
        selectedRoom: '',
        nameProduct: '',
        description: '',
        storeLink: '',
        urlImage: ''
      }}
      validationSchema={CreateProductShema}
      onSubmit={async (values, { resetForm }) => {
        const status = await handleSubmitForm(values);
        if (status === 201)
          resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={`mb-4 ${errors.selectedRoom && touched.selectedRoom ? "mb-1" : "mb-4"}`}>
            <label htmlFor='selectedRoom' className='block text-zinc-700 text-sm font-bold mb-2'>Qual comodo pertence o produto?</label>
            <Field
              name='selectedRoom'
              as='select'
              className={`shadow border rounded w-full py-2 px-2 text-zinc-700 leading-tight text-sm h-10 focus:outline-none focus:shadow-outline ${errors.selectedRoom && touched.selectedRoom ? "border-red-400" : ""}`}
            >
              <option selected value='0'>Por favor escolha sua opção</option>
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
            </Field>
            <ErrorMessage name='selectedRoom' component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.nameProduct && touched.nameProduct ? "mb-1" : "mb-4"}`}>
            <label htmlFor='nameProduct' className='block text-zinc-700 text-sm font-bold mb-2'>Nome do produto</label>
            <Field
              type='text'
              name='nameProduct'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight text-sm h-10 focus:outline-none focus:shadow-outline ${errors.nameProduct && touched.nameProduct ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="nameProduct" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.description && touched.description ? "mb-1" : "mb-4"}`}>

            <label htmlFor='description' className='block text-zinc-700 text-sm font-bold mb-2'>Descrição</label>
            <Field
              type="text"
              name='description'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight text-sm h-10 focus:outline-none focus:shadow-outline ${errors.description && touched.description ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="description" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.storeLink && touched.storeLink ? "mb-1" : "mb-4"}`}>

            <label htmlFor='storeLink' className='block text-zinc-700 text-sm font-bold mb-2'>Link da loja</label>
            <Field
              type="text"
              name='storeLink'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight text-sm h-10 focus:outline-none focus:shadow-outline ${errors.storeLink && touched.storeLink ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="storeLink" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.urlImage && touched.urlImage ? "mb-1" : "mb-4"}`}>

            <label htmlFor='urlImage' className='block text-zinc-700 text-sm font-bold mb-2'>Url da imagem</label>
            <Field
              type="text"
              name='urlImage'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.urlImage && touched.urlImage ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="urlImage" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className="mt-5 mb-2 text-center">
            <button
              type="submit"
              className="bg-emerald-600 h-10 p-2 rounded-lg text-white"
            >
              Adicionar
            </button>
          </div>

        </Form>
      )}
    </Formik >
  )
}