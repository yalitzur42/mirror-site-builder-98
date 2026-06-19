/**
 * Unified icon system for the site.
 *
 * Wraps Phosphor Icons with `weight="duotone"` by default so every page-level
 * icon has the same richer, two-tone look. Names mirror Lucide React so the
 * existing call sites can keep their JSX intact — only the import path changes
 * from `lucide-react` to `@/lib/icons`.
 *
 * Phosphor uses different prop names than Lucide:
 *  - Lucide: `strokeWidth`  -> Phosphor: ignored (we drop it)
 *  - Lucide: `absoluteStrokeWidth` -> ignored
 *
 * Everything else (size, color, className, onClick, ...) is forwarded.
 */
import { forwardRef, type ComponentType, type SVGProps } from "react";
import {
  // Aliases — Lucide name → Phosphor name
  Question as PhQuestion,
  CircleNotch as PhCircleNotch,
  WarningCircle as PhWarningCircle,
  Warning as PhWarning,
  SealCheck as PhSealCheck,
  Money as PhMoney,
  CaretDown as PhCaretDown,
  CaretLeft as PhCaretLeft,
  CaretRight as PhCaretRight,
  CaretUp as PhCaretUp,
  House as PhHouse,
  SignIn as PhSignIn,
  SignOut as PhSignOut,
  Envelope as PhEnvelope,
  List as PhList,
  ChatCircle as PhChatCircle,
  ChatCircleDots as PhChatCircleDots,
  DeviceMobile as PhDeviceMobile,
  FloppyDisk as PhFloppyDisk,
  Gear as PhGear,
  ShieldWarning as PhShieldWarning,
  Sparkle as PhSparkle,
  TrendUp as PhTrendUp,
  Lightning as PhLightning,
  Medal as PhMedal,
  PersonArmsSpread as PhPerson,
  PaperPlaneTilt as PhPaperPlane,
  Image as PhImage,
  InstagramLogo as PhInstagramLogo,
  Diamond as PhDiamond,
  Plus as PhPlus,
  Minus as PhMinus,
  DotsThree as PhDotsThree,
  DotsThreeVertical as PhDotsThreeVertical,
  DotsSixVertical as PhGripVertical,
  Circle as PhCircle,
  Eye as PhEye,
  EyeSlash as PhEyeSlash,
  // Direct passthroughs (same name as Lucide)
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  Clock,
  Coins,
  Compass,
  Crown,
  FileText,
  Flame,
  GraduationCap,
  Hand,
  Handshake,
  Heart,
  ListChecks,
  Lock,
  MapPin,
  NavigationArrow as PhNavigation,
  Phone,
  PlayCircle,
  Rocket,
  Scissors,
  Shield,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Upload,
  Users,
  Waves,
  X,
  CircleHalf as PhCircleHalf,
  Sun as PhSun,
  Moon as PhMoon,
  Link as PhLink,
  TextAa as PhTextAa,
  CursorClick as PhCursorClick,
  TextAlignJustify as PhTextAlignJustify,
  Pause as PhPause,
  Play as PhPlay,
  ArrowCounterClockwise as PhArrowCounterClockwise,
  PencilSimple as PhPencil,
  Trash as PhTrash,
  XCircle as PhXCircle,
  ClipboardText as PhClipboardText,
  UserPlus as PhUserPlus,
  UserCircleCheck as PhUserCheck,
  Copy as PhCopy,
  CalendarDots as PhCalendarDots,
  Briefcase as PhBriefcase,
  VideoCamera as PhVideoCamera,
  SquaresFour as PhSquaresFour,
  Info as PhInfo,
  Drop as PhDrop,
  Images as PhImages,
  type Icon as PhosphorIconType,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";

type LucideCompatProps = Omit<PhosphorIconProps, "ref"> & {
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
};

const wrap = (
  Cmp: PhosphorIconType,
  displayName: string,
): ComponentType<LucideCompatProps> => {
  const Wrapped = forwardRef<SVGSVGElement, LucideCompatProps>(
    ({ weight, strokeWidth: _sw, absoluteStrokeWidth: _asw, ...rest }, ref) => (
      <Cmp ref={ref} weight={weight ?? "duotone"} {...rest} />
    ),
  );
  Wrapped.displayName = displayName;
  return Wrapped as ComponentType<LucideCompatProps>;
};

// Re-export every used icon under its Lucide name, defaulting to duotone.
export const Accessibility = wrap(PhPerson, "Accessibility");
export const AlertCircle = wrap(PhWarningCircle, "AlertCircle");
export const AlertTriangle = wrap(PhWarning, "AlertTriangle");
export const ArrowLeftIcon = wrap(ArrowLeft, "ArrowLeftIcon");
const ArrowLeftWrapped = wrap(ArrowLeft, "ArrowLeft");
export { ArrowLeftWrapped as ArrowLeft };
export const ArrowRightWrapped = wrap(ArrowRight, "ArrowRight");
export { ArrowRightWrapped as ArrowRight };
export const ArrowUpWrapped = wrap(ArrowUp, "ArrowUp");
export { ArrowUpWrapped as ArrowUp };
export const ArrowDownWrapped = wrap(ArrowDown, "ArrowDown");
export { ArrowDownWrapped as ArrowDown };
export const Award = wrap(PhMedal, "Award");
export const BadgeCheck = wrap(PhSealCheck, "BadgeCheck");
export const Banknote = wrap(PhMoney, "Banknote");
export const BookOpenWrapped = wrap(BookOpen, "BookOpen");
export { BookOpenWrapped as BookOpen };
export const CalendarWrapped = wrap(Calendar, "Calendar");
export { CalendarWrapped as Calendar };
export const CameraWrapped = wrap(Camera, "Camera");
export { CameraWrapped as Camera };
export const CheckWrapped = wrap(Check, "Check");
export { CheckWrapped as Check };
export const CheckCircleWrapped = wrap(CheckCircle, "CheckCircle");
export { CheckCircleWrapped as CheckCircle };
export const CheckCircle2 = wrap(CheckCircle, "CheckCircle2");
export const ChevronDown = wrap(PhCaretDown, "ChevronDown");
export const ChevronUp = wrap(PhCaretUp, "ChevronUp");
export const ChevronLeft = wrap(PhCaretLeft, "ChevronLeft");
export const ChevronRight = wrap(PhCaretRight, "ChevronRight");
export const Circle = wrap(PhCircle, "Circle");
export const ClockWrapped = wrap(Clock, "Clock");
export { ClockWrapped as Clock };
export const CoinsWrapped = wrap(Coins, "Coins");
export { CoinsWrapped as Coins };
export const CompassWrapped = wrap(Compass, "Compass");
export { CompassWrapped as Compass };
export const CrownWrapped = wrap(Crown, "Crown");
export { CrownWrapped as Crown };
export const Dot = wrap(PhCircle, "Dot");
export const EyeWrapped = wrap(PhEye, "Eye");
export { EyeWrapped as Eye };
export const EyeOff = wrap(PhEyeSlash, "EyeOff");
export const FileTextWrapped = wrap(FileText, "FileText");
export { FileTextWrapped as FileText };
export const FlameWrapped = wrap(Flame, "Flame");
export { FlameWrapped as Flame };
export const Gem = wrap(PhDiamond, "Gem");
export const GraduationCapWrapped = wrap(GraduationCap, "GraduationCap");
export { GraduationCapWrapped as GraduationCap };
export const GripVertical = wrap(PhGripVertical, "GripVertical");
export const HandWrapped = wrap(Hand, "Hand");
export { HandWrapped as Hand };
export const HandshakeWrapped = wrap(Handshake, "Handshake");
export { HandshakeWrapped as Handshake };
export const HeartWrapped = wrap(Heart, "Heart");
export { HeartWrapped as Heart };
export const HelpCircle = wrap(PhQuestion, "HelpCircle");
export const Home = wrap(PhHouse, "Home");
export const ImagePlus = wrap(PhImage, "ImagePlus");
export const Instagram = wrap(PhInstagramLogo, "Instagram");
export const ListChecksWrapped = wrap(ListChecks, "ListChecks");
export { ListChecksWrapped as ListChecks };
export const LockWrapped = wrap(Lock, "Lock");
export { LockWrapped as Lock };
export const Loader2 = wrap(PhCircleNotch, "Loader2");
export const LogIn = wrap(PhSignIn, "LogIn");
export const LogOut = wrap(PhSignOut, "LogOut");
export const Mail = wrap(PhEnvelope, "Mail");
export const MapPinWrapped = wrap(MapPin, "MapPin");
export { MapPinWrapped as MapPin };
export const Menu = wrap(PhList, "Menu");
export const MessageCircle = wrap(PhChatCircle, "MessageCircle");
export const MessageCircleDots = wrap(PhChatCircleDots, "MessageCircleDots");
export const Minus = wrap(PhMinus, "Minus");
export const MonitorSmartphone = wrap(PhDeviceMobile, "MonitorSmartphone");
export const MoreHorizontal = wrap(PhDotsThree, "MoreHorizontal");
export const MoreVertical = wrap(PhDotsThreeVertical, "MoreVertical");
export const Navigation = wrap(PhNavigation, "Navigation");
export const PanelLeft = wrap(PhList, "PanelLeft");
export const PhoneWrapped = wrap(Phone, "Phone");
export { PhoneWrapped as Phone };
export const PlayCircleWrapped = wrap(PlayCircle, "PlayCircle");
export { PlayCircleWrapped as PlayCircle };
export const Plus = wrap(PhPlus, "Plus");
export const RocketWrapped = wrap(Rocket, "Rocket");
export { RocketWrapped as Rocket };
export const Save = wrap(PhFloppyDisk, "Save");
export const ScissorsWrapped = wrap(Scissors, "Scissors");
export { ScissorsWrapped as Scissors };
export const Search = wrap(PhQuestion, "Search"); // unused but safe
export const Send = wrap(PhPaperPlane, "Send");
export const Settings = wrap(PhGear, "Settings");
export const ShieldWrapped = wrap(Shield, "Shield");
export { ShieldWrapped as Shield };
export const ShieldAlert = wrap(PhShieldWarning, "ShieldAlert");
export const ShieldCheckWrapped = wrap(ShieldCheck, "ShieldCheck");
export { ShieldCheckWrapped as ShieldCheck };
export const Smartphone = wrap(PhDeviceMobile, "Smartphone");
export const Sparkles = wrap(PhSparkle, "Sparkles");
export const StarWrapped = wrap(Star, "Star");
export { StarWrapped as Star };
export const TargetWrapped = wrap(Target, "Target");
export { TargetWrapped as Target };
export const TrendingUp = wrap(PhTrendUp, "TrendingUp");
export const TrophyWrapped = wrap(Trophy, "Trophy");
export { TrophyWrapped as Trophy };
export const UploadWrapped = wrap(Upload, "Upload");
export { UploadWrapped as Upload };
export const UsersWrapped = wrap(Users, "Users");
export { UsersWrapped as Users };
export const WavesWrapped = wrap(Waves, "Waves");
export { WavesWrapped as Waves };
export const XWrapped = wrap(X, "X");
export { XWrapped as X };
export const Zap = wrap(PhLightning, "Zap");

// Additional Lucide-name aliases
export const Contrast = wrap(PhCircleHalf, "Contrast");
export const Sun = wrap(PhSun, "Sun");
export const Moon = wrap(PhMoon, "Moon");
export const Link2 = wrap(PhLink, "Link2");
export const Type = wrap(PhTextAa, "Type");
export const MousePointer2 = wrap(PhCursorClick, "MousePointer2");
export const AlignJustify = wrap(PhTextAlignJustify, "AlignJustify");
export const Pause = wrap(PhPause, "Pause");
export const Play = wrap(PhPlay, "Play");
export const RotateCcw = wrap(PhArrowCounterClockwise, "RotateCcw");
export const Pencil = wrap(PhPencil, "Pencil");
export const Trash2 = wrap(PhTrash, "Trash2");
export const XCircle = wrap(PhXCircle, "XCircle");
export const ImageWrapped = wrap(PhImage, "Image");
export { ImageWrapped as Image };
export const ImageIcon = wrap(PhImage, "ImageIcon");
export const Images = wrap(PhImages, "Images");
export const ClipboardList = wrap(PhClipboardText, "ClipboardList");
export const UserPlus = wrap(PhUserPlus, "UserPlus");
export const UserCheck = wrap(PhUserCheck, "UserCheck");
export const Copy = wrap(PhCopy, "Copy");
export const CalendarDays = wrap(PhCalendarDots, "CalendarDays");
export const BriefcaseBusiness = wrap(PhBriefcase, "BriefcaseBusiness");
export const Video = wrap(PhVideoCamera, "Video");
export const LayoutDashboard = wrap(PhSquaresFour, "LayoutDashboard");
export const Info = wrap(PhInfo, "Info");
export const Droplets = wrap(PhDrop, "Droplets");

// Type alias compatible with Lucide's LucideIcon
export type LucideIcon = ComponentType<LucideCompatProps>;
