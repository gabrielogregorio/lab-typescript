import * as yup from 'yup';

export const gtaPersonsSchema: yup.AnyObjectSchema = yup.object().shape({
  name: yup.string().typeError('need-type').required('type a value'),
  gta: yup.string().typeError('need-type').required('type a value'),
});
