import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import api from '../lib/axios.js'
import { useNavigate } from 'react-router'
import { toast } from "sonner"

const signInSchema = z.object({
  name:z.string().min(1 , 'Vui lòng nhập tài khoản'),
  password:z.string().min(6 , 'Vui lòng nhập mật khẩu')
})



export function LoginForm({className,...props}){

  const navigate = useNavigate()

  const {register , handleSubmit , formState :{errors} , setError} = useForm({
    resolver:zodResolver(signInSchema)
  })

  const onSubmit = async(data)=>{
    try {
      const res = await api.post("/auth/signin" , data)

      localStorage.setItem("accessToken", res.data.accessToken)
      localStorage.setItem("role",res.data.user.role)
      localStorage.setItem("name", res.data.user.name,)

      //check role
      if(res.data.user.role === "admin"){
        navigate("/dashboard")
        toast.success("Đăng nhập thành công")
      }else{
        navigate("/dashboard")
        toast.success("Đăng nhập thành công")
      }
    } catch (error) {
      toast.error("Đăng nhập không thành công ")
      const message = error.response?.data?.message??"lỗi kết nối"
      setError("root", {message})
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập tài khoản của bạn</CardTitle>
          <CardDescription>
            Vui lòng điền tài khoản và mật khẩu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Tên đăng nhập</FieldLabel>
                <Input id="name" type="text" placeholder="Tên đăng nhập..." {...register("name")} />
                <p className="min-h-[20px] text-sm text-red-500">{errors.name?.message}</p>
              </Field>  
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Mật khẩu..." {...register("password")} />
                <p className="min-h-[20px] text-sm text-red-500">{errors.password?.message}</p>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
            {errors.root && (<p className="text-sm text-red-500 text-center">{errors.root.message}</p>)}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
