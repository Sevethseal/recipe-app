import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuid4v } from 'uuid'
import FirebaseStorageService from '../../firebaseStorageService'
import './styles.css'
import { FileUploadComponentProps } from './types'
const FileUploadComponent = ({
  basePath,
  existingUrl,
  handleUploadFinish,
  handleUploadCancel,
}: FileUploadComponentProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileRef = useRef<any>()
  const [imageUrl, setImageUrl] = useState('')
  const [progress, setProgress] = useState(-1)
  useEffect(() => {
    if (existingUrl) {
      setImageUrl(existingUrl)
    } else {
      if (fileRef.current) {
        fileRef.current.value = null
      }
    }
  }, [existingUrl])

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    const file = files?.[0]
    if (!file) {
      alert('no file!')
      return
    }
    const generatedId = uuid4v()
    const downloadUrl = await FirebaseStorageService.uploadFile(
      file,
      `${basePath}/${generatedId}`,
      setProgress
    )
    setImageUrl(downloadUrl)
    handleUploadFinish(downloadUrl)
  }
  const handleCancelImage = () => {
    FirebaseStorageService.deleteFile(imageUrl)
    if (fileRef.current) {
      fileRef.current.value = null
    }
    setImageUrl('')
    setProgress(-1)
    handleUploadCancel()
  }
  return (
    <div>
      <input
        type="file"
        accept={'image/*'}
        ref={fileRef}
        onChange={handleFileChange}
        hidden={Boolean(imageUrl || progress > -1)}
      />
      <div>
        {!imageUrl && progress > -1 ? (
          <div>
            <label htmlFor="file">Upload Progress</label>
            <progress id="file" value={progress} max="100">
              {progress}%
            </progress>
          </div>
        ) : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt={imageUrl} className="image" />
            <button type="button" onClick={handleCancelImage}>
              Cancel Image
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FileUploadComponent
