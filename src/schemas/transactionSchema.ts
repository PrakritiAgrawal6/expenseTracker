import * as Yup from 'yup';

//Validation schema for  Transactions
export const transactionValidationSchema = Yup.object({
              title: Yup.string().required('Title is Required'),
              amount: Yup.number().required('Amount is Required').positive('Must be positive'),
              type: Yup.string().oneOf(['income', 'expense']).required('Required'),
              date: Yup.date().required('Date is Required'),
              category: Yup.string().required('Category is Required')
            })