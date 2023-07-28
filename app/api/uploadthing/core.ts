import { createUploadthing,  } from "uploadthing/next";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 8 } })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new Error("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
    }),
    mediaPost: f({
        image: { maxFileSize: "8MB", maxFileCount: 8 },
        video: { maxFileSize: "256MB", maxFileCount: 1 },
      })
        .middleware(({ req }) => auth(req))
        .onUploadComplete((data) => console.log("file", data)),
} ;
 
export type OurFileRouter = typeof ourFileRouter;