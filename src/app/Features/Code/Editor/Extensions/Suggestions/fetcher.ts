import { toast } from 'sonner';
import ky from 'ky'

interface args {
  fullcode: string,
  selectedCode: string
  userprompt: string
}

const fetcher = ({ fullcode, selectedCode, userprompt }: args) => {
  console.log("call the fetcher")
  const response = ky.post('/api/ai/suggestions', {
    timeout: 10000,
    json: {
      fullcode,
      selectedCode,
      userprompt
    }
  }).json()
}

export default fetcher
