import { Controller, useForm } from "react-hook-form";
import { FormData, NewUserFormProps } from "./types.ts";
import { ModifiedUser } from "../../services/reducers/users/types.ts";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./style.module.scss";

export const NewUserForm = ({ onSubmit, onClose }: NewUserFormProps) => {
  const {
    control, handleSubmit, formState: { errors }, reset
  } = useForm<FormData>({
    defaultValues: {
      name: "", username: "", email: "", phone: "", zipcode: "",
    }
  });

  const formatPhone = (value: string): string => {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return `+7 ${match[2] ? `${match[2]}` : ''}${match[3] ? ` ${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}${match[5] ? `-${match[5]}` : ''}`;
    }
    return value;
  };

  return (<div className={styles["new-user-form-container"]}>
    <h2>Create user</h2>
    <form onSubmit={handleSubmit((data) => {
      const newUserData: ModifiedUser = {
        // TODO use uuid or check for existing user?
        id: Math.floor(Math.random() * 1000 + 10),
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        zipcode: data.zipcode || ""
      };

      onSubmit(newUserData);
      onClose("New user added");
    })}>
      <div className={styles.field}>
        <label>Name:</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Username:</label>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required', pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'incorrect email',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Phone:</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required', pattern: {
              value: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, message: 'incorrect phone format',
            },
          }}
          render={({ field }) => (<input
            type={"tel"}
            maxLength={16}
            {...field}
            onChange={(e) => {
              field.onChange(formatPhone(e.target.value));
            }}
          />)}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Zipcode:</label>
        <Controller
          name="zipcode"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <ButtonGroup variant="contained" className={styles["controls"]}>
        <Button variant="contained" type="submit">Add user</Button>
        <Button variant="contained" onClick={() => {
          reset();
          onClose();
        }}>Cancel</Button>
      </ButtonGroup>
    </form>
  </div>)
}
