// Ensure TypeScript recognizes the global FormData and Blob if not configured in lib
declare var FormData: any;
declare var Blob: any;

export const uploadFileToCloudinary = async (fileBuffer: Buffer, resourceType: 'image' | 'video' | 'audio' | 'auto' = 'auto'): Promise<string> => {
    try {
        console.log(`Starting Cloudinary Upload (${resourceType})...`);
        const formData = new FormData();

        // Convert Buffer to Blob
        const blob = new Blob([fileBuffer]);

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error("Cloudinary configuration missing in environment variables");
        }

        formData.append('file', blob, 'upload');
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', cloudName);

        // Cloudinary API URL: https://api.cloudinary.com/v1_1/<cloud_name>/<resource_type>/upload
        // Audio is treated as 'video' in Cloudinary
        const type = resourceType === 'audio' ? 'video' : resourceType;

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await response.json() as any;

        if (data.secure_url) {
            return data.secure_url;
        } else {
            console.error("Cloudinary Error Response:", data);
            throw new Error(data.error?.message || "Upload failed");
        }
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};

export const uploadImageToCloudinary = (fileBuffer: Buffer) => uploadFileToCloudinary(fileBuffer, 'image');
