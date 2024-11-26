import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const useAddVehicleMutation = () => {
  const { toast } = useToast();
  const mutationFn = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/vehicleInformation`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add vehicle");
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Vehicle added successfully",
        description: "You can now manage your vehicle information",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add vehicle",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return mutation;
};
export default useAddVehicleMutation;
