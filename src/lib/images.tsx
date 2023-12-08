import { supabase } from "./supabase";

export const imageValidate = {
  validate: (value: any) =>
    value[0]?.size >= 5 * 1024 * 1024
      ? "Image size must be less than 5mb."
      : true,
};

export const uploadFile = async (
  file: File,
  applicantNumber: string,
  fileName: string
) => {
  const extension = file?.name?.split(".").pop();
  const filePath = `${applicantNumber}/${fileName}.${extension}`;
  return await supabase.storage
    .from("requirements")
    .upload(filePath, file, { upsert: true });
};

export const uploadRequirementFile = async (
  file: File,
  applicantNumber: string,
  fileName: string
) => {
  const { data, error } = await uploadFile(file, applicantNumber, fileName);
  if (error) throw new Error(error.message);
  return `https://ifajmjqjttcioleifdnu.supabase.co/storage/v1/object/public/requirements/${data.path}`;
};
