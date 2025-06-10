import { useGlobal } from "@pureadmin/utils";

export const useNav = () => {
  const { $storage } = useGlobal<GlobalPropertiesApi>();
  
  return {
    $storage
  }
}