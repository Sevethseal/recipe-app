export interface FileUploadComponentProps {
  basePath: string
  existingUrl: string
  handleUploadFinish: (url?: string) => void
  handleUploadCancel: (url?: string) => void
}
