import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const useLoginMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mutationFn = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      navigate("/vehicle-information");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useLoginMutation;
