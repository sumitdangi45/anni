import waIcon from "@/assets/dd/WhatsApp-Style Green Chat Icon.png";

interface Props {
  size?: number;
  style?: React.CSSProperties;
}

const WhatsAppIcon = ({ size = 16, style }: Props) => (
  <img
    src={waIcon}
    alt="WhatsApp"
    width={size}
    height={size}
    style={{ objectFit: "contain", flexShrink: 0, ...style }}
  />
);

export default WhatsAppIcon;
