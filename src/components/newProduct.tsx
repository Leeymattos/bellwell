import { api } from "@/services/api";
import { Room } from "@prisma/client"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { toast, Flip } from "react-toastify";

type NewProductProps = {
  rooms: Room[]
}

interface ValuesForm {
  selectedRoom: string;
  nameProduct: string;
  description: string;
  link: string;
  urlImage: string;
}

export function NewProduct({ rooms }: NewProductProps) {

  const CreateProductShema = Yup.object().shape({
    selectedRoom: Yup.string()
      .required('Necessário escolher um comodo'),
    nameProduct: Yup.string()
      .min(2, 'Nome menor do que o esperado')
      .max(100, 'Nome maior do o esperado')
      .required('Campo obrigatório'),
    description: Yup.string()
      .min(2, 'Nome menor do que o esperado')
      .max(100, 'Nome maior do o esperado')
      .required('Campo obrigatório'),
    link: Yup.string()
      .min(2, 'Nome menor do que o esperado')
      .required('Campo obrigatório'),
    urlImage: Yup.string()
      .min(2, 'Nome menor do que o esperado')
      .required('Campo obrigatório'),

  })
  async function handleSubmitForm(values: ValuesForm) {

    try {
      const res = await api.post('/product', {
        name: values.nameProduct,
        description: values.description,
        link: values.link,
        image_url: values.urlImage,
        room_id: values.selectedRoom
      })

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
    }
  }

  return (
    <Formik
      initialValues={{
        selectedRoom: '',
        nameProduct: '',
        description: '',
        link: '',
        urlImage: ''
      }}
      validationSchema={CreateProductShema}
      onSubmit={values => {
        handleSubmitForm(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>

          <div className={`mb-4 ${errors.selectedRoom && touched.selectedRoom ? "mb-1" : "mb-4"}`}>
            <label htmlFor='comodos' className='block text-zinc-700 text-sm font-bold mb-2'>Qual comodo pertence o produto?</label>
            <Field
              name='selectedRoom'
              as='select'
              id="comodos"
              className={`shadow border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.selectedRoom && touched.selectedRoom ? "border-red-400" : ""}`}
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
            </Field>
            <ErrorMessage name='selectedRoom' component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.nameProduct && touched.nameProduct ? "mb-1" : "mb-4"}`}>
            <label htmlFor='nameProduct' className='block text-zinc-700 text-sm font-bold mb-2'>Nome do produto</label>
            <Field
              type='text'
              name='nameProduct'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nameProduct && touched.nameProduct ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="nameProduct" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.description && touched.description ? "mb-1" : "mb-4"}`}>

            <label htmlFor='description' className='block text-zinc-700 text-sm font-bold mb-2'>Descrição</label>
            <Field
              type="text"
              name='description'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nameProduct && touched.nameProduct ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="description" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.link && touched.link ? "mb-1" : "mb-4"}`}>

            <label htmlFor='link' className='block text-zinc-700 text-sm font-bold mb-2'>Link da loja</label>
            <input
              type="text"
              name="link"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nameProduct && touched.nameProduct ? "border-red-400" : ""}`}
            />
            <ErrorMessage name="link" component='div' className="text-red-400 text-xs leading-tight mt-1 ml-0.5" />
          </div>

          <div className={`mb-4 ${errors.urlImage && touched.urlImage ? "mb-1" : "mb-4"}`}>

            <label htmlFor='urlImage' className='block text-zinc-700 text-sm font-bold mb-2'>Url da imagem</label>
            <Field
              type="text"
              name='urlImage'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nameProduct && touched.nameProduct ? "border-red-400" : ""}`}
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