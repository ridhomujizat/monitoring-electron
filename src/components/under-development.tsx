import { SettingOutlined } from "@ant-design/icons";

export default function UnderDevelopment() {
  return (
    <div className="flex min-h-[500px] flex-col gap-2 justify-center items-center">
      <SettingOutlined style={{ fontSize: "32px" }} />
      <p> Under Development</p>
    </div>
  );
}
