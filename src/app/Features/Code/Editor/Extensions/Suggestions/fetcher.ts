import { toast } from 'sonner';
import ky from 'ky'

interface args {
  fullcode: string,
  selectedCode: string
  userprompt: string
}

const fetcher = async ({ fullcode, selectedCode, userprompt }: args) => {
  try {
    const response: any = await ky.post('/api/ai/suggestions', {
      timeout: 10000,
      json: {
        fullcode,
        selectedCode,
        userprompt
      }
    }).json()
    if (!response || response?.data == 'NULL') {
      toast.error('Failed to generate suggestions')
      return
    }

    return response


  } catch {

    toast.error("Failed to generate suggestions")
  }

}

export default fetcher
