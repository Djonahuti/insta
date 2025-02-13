import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setfile] = useState<File[]>([]);
    const [fileUrl, setfileUrl] = useState(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
          setfile(acceptedFiles);
          fieldChange(acceptedFiles);
          setfileUrl(URL.createObjectURL(acceptedFiles[0]));
        }, [file]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
            'audio/*': ['.mp3', '.m4a', '.wav', '.flac', '.mpeg'],
            'video/*': ['.mp4', '.m4v', '.x-m4v', '.avi', '.mov', '.webm', '.avchd', '.wmv']
        }
    })
  
  
  return (
    <div {...getRootProps()} className='flex flex-centr flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
        <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                <img src={fileUrl} alt='file' className='file_uploader-img' />
            </div>
            <p className='file_uploader-label'>Click or Drag to replace</p>
        </>
        ) : (
            <div className='file_uploader-box'>
                <img src='/assets/icons/file-upload.svg' width={96} height={77} alt='file-upload' />

                <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag and drop files here, or click to select files</h3>
                <p className='text-light-4 small-regular mb-6'>MP3, MP4, PNG, JPG, WAV, AVI, M4A, FLAC</p>
                <Button className='shad-button_dark_4'>
                    Select from Device
                </Button>
            </div>
        )
      }
    </div>
  )
}

export default FileUploader