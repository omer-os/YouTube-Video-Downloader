import YTBDownloaderCon from "@/components/YTBDownloaderCon";

export default function page() {
  return (
    <div>
      <div className="sm:text-4xl text-2xl font-bold text-center mt-10">
        تحميل فيديوهات اليوتيوب
      </div>
      <div className="text-zinc-500 text-center sm:text-base text-sm mt-3">
        هذا الموقع مخصص لتحميل فيديوهات يوتيوب، يمكنك تنزيلها كملف فيديو أو ملف
        صوتي
      </div>

      <YTBDownloaderCon />
    </div>
  );
}
