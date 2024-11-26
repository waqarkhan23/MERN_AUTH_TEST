import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import useLoginMutation from "@/hooks/auth/login";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { mutate: login } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(input);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  onChange={(e) => handleInputChange(e)}
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    onChange={(e) => handleInputChange(e)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
