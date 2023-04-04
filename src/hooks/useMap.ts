import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Path } from '../types/typings.t';
import { MapAPI } from '@/api';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { mapAtoms } from '@/atoms';

const useMap = () => {
  /**
   * hook states
   */
  const navigate = useNavigate();
  const setShowPathMarker = useSetRecoilState(mapAtoms.showPathMarkerState);
  const queryClient = useQueryClient();

  /**
   * hook function
   */

  // store path
  const { mutateAsync: storePathMutateAsync, isLoading: isStoringPath } =
    useMutation({
      mutationFn: (data: Path) => {
        return MapAPI.storePath(data);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        navigate('/history');
        setShowPathMarker(false);
        Toasts.successToast(data.message);
      },
    });

  return {
    storePathMutateAsync,
    isStoringPath,
  };
};

export default useMap;
