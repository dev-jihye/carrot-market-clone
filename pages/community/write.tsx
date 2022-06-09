import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import Textarea from '@components/textarea';
import { useForm } from 'react-hook-form';

interface WriteForm {
  question: string;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<WriteForm>();
  const onValid = (data: WriteForm) => {
    console.log(data);
  };
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <Textarea
          register={register('question', { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
