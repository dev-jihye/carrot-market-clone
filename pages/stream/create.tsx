import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import Textarea from '@components/textarea';
import { useForm } from 'react-hook-form';

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    console.log(form);
  };
  return (
    <Layout title="Go Live" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <Input
          register={register('name', { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register('price', { required: true })}
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
        />
        <Textarea
          register={register('description', { required: true })}
          name="description"
          label="Description"
        />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
