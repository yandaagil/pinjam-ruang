'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Calendar,
  Clock,
  Eye,
  Globe,
  CalendarDays,
  Sun,
} from 'lucide-react';
import { useEventCalendarStore } from '@/hooks/use-event';
import {
  CalendarViewConfigs,
  CalendarViewType,
  daysViewConfig,
  DayViewConfig,
  MonthViewConfig,
  TimeFormatType,
  ViewModeType,
  WeekViewConfig,
  YearViewConfig,
} from '@/types/event';
import { useShallow } from 'zustand/shallow';
import { ScrollArea } from '../ui/scroll-area';
import { parseAsString, useQueryState } from 'nuqs';
import { LOCALES } from '@/constants/calendar-constant';
import { getLocaleFromCode } from '@/lib/event';
import { getLocalizedDaysOfWeek } from '@/lib/date';

const VIEW_TYPES = [
  { value: 'day', label: 'Tampilan Hari' },
  { value: 'days', label: 'Tampilan Banyak Hari' },
  { value: 'week', label: 'Tampilan Minggu' },
  { value: 'month', label: 'Tampilan Bulan' },
  { value: 'year', label: 'Tampilan Tahun' },
] as const;

const VIEW_MODES = [
  { value: 'calendar', label: 'Mode Kalender' },
  { value: 'list', label: 'Mode Daftar' },
] as const;

const TABS = [
  { id: 'general', label: 'Umum', icon: Settings },
  { id: 'calendar', label: 'Tampilan Kalender', icon: Calendar },
] as const;

const ConfigRow = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="min-w-0 flex-1 pr-4">
      <div className="text-foreground text-sm font-medium">{label}</div>
      {description && (
        <div className="text-muted-foreground mt-1 text-xs">{description}</div>
      )}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

const ConfigSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
      <Icon className="h-4 w-4" />
      {title}
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

interface GeneralSettingsProps {
  currentView: CalendarViewType;
  viewMode: ViewModeType;
  timeFormat: TimeFormatType;
  locale: string;
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  handleViewChange: (value: CalendarViewType) => void;
  setMode: (value: ViewModeType) => void;
  setTimeFormat: (value: TimeFormatType) => void;
  setLocale: (value: string) => void;
  setFirstDayOfWeek: (value: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
}

export default function EventCalendarSettingsDialog() {
  const {
    currentView,
    viewMode,
    timeFormat,
    locale,
    firstDayOfWeek,
    viewSettings,
    setView,
    setMode,
    setTimeFormat,
    setLocale,
    setFirstDayOfWeek,
    updateDayViewConfig,
    updateDaysViewConfig,
    updateWeekViewConfig,
    updateMonthViewConfig,
    updateYearViewConfig,
  } = useEventCalendarStore(
    useShallow((state) => ({
      currentView: state.currentView,
      viewMode: state.viewMode,
      timeFormat: state.timeFormat,
      locale: state.locale,
      firstDayOfWeek: state.firstDayOfWeek,
      daysCount: state.daysCount,
      viewSettings: state.viewSettings,
      setView: state.setView,
      setMode: state.setMode,
      setTimeFormat: state.setTimeFormat,
      setLocale: state.setLocale,
      setFirstDayOfWeek: state.setFirstDayOfWeek,
      setDaysCount: state.setDaysCount,
      updateDayViewConfig: state.updateDayViewConfig,
      updateDaysViewConfig: state.updateDaysViewConfig,
      updateWeekViewConfig: state.updateWeekViewConfig,
      updateMonthViewConfig: state.updateMonthViewConfig,
      updateYearViewConfig: state.updateYearViewConfig,
    })),
  );

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [, startTransition] = useTransition();
  const [, setQueryView] = useQueryState(
    'view',
    parseAsString.withOptions({
      shallow: false,
      throttleMs: 3,
      startTransition,
    }),
  );

  const handleViewChange = (value: CalendarViewType) => {
    setQueryView(value);
    setView(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Pengaturan Kalender
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-hidden p-0 sm:max-w-3xl">
        <div className="flex h-full">
          <div className="bg-muted/20 w-56 border-r p-4">
            <div className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50 text-foreground'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className={`text-sm`}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Pengaturan Kalender
              </DialogTitle>
              <DialogDescription>
                Sesuaikan pengalaman dan perilaku kalender Anda
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <ScrollArea className="h-[400px] w-full pr-4">
                {activeTab === 'general' && (
                  <GeneralSettings
                    currentView={currentView}
                    viewMode={viewMode}
                    timeFormat={timeFormat}
                    locale={locale}
                    firstDayOfWeek={firstDayOfWeek}
                    handleViewChange={handleViewChange}
                    setMode={setMode}
                    setTimeFormat={setTimeFormat}
                    setLocale={setLocale}
                    setFirstDayOfWeek={setFirstDayOfWeek}
                  />
                )}
                {activeTab === 'calendar' && (
                  <CalendarSettings
                    viewSettings={viewSettings}
                    updateDayViewConfig={updateDayViewConfig}
                    updateDaysViewConfig={updateDaysViewConfig}
                    updateWeekViewConfig={updateWeekViewConfig}
                    updateMonthViewConfig={updateMonthViewConfig}
                    updateYearViewConfig={updateYearViewConfig}
                  />
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const GeneralSettings = ({
  currentView,
  viewMode,
  timeFormat,
  locale,
  firstDayOfWeek,
  handleViewChange,
  setMode,
  setTimeFormat,
  setLocale,
  setFirstDayOfWeek,
}: GeneralSettingsProps) => {
  const localeObj = getLocaleFromCode(locale);
  const localizedDays = getLocalizedDaysOfWeek(localeObj);
  return (
    <div className="space-y-8">
      <ConfigSection title="Tampilan & Format" icon={Eye}>
        <ConfigRow
          label="Tampilan default"
          description="Pilih tampilan yang dibuka secara default"
        >
          <Select value={currentView} onValueChange={handleViewChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VIEW_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ConfigRow>
        <ConfigRow
          label="Mode tampilan"
          description="Mode tampilan default untuk kalender"
        >
          <Select
            value={viewMode}
            onValueChange={(value: ViewModeType) => setMode(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VIEW_MODES.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ConfigRow>
        <ConfigRow
          label="Format Waktu"
          description="Pilih antara format 12 jam atau 24 jam"
        >
          <Select
            value={timeFormat}
            onValueChange={(value: TimeFormatType) => setTimeFormat(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12-hour (AM/PM)</SelectItem>
              <SelectItem value="24">24-hour</SelectItem>
            </SelectContent>
          </Select>
        </ConfigRow>
      </ConfigSection>
      <Separator />
      <ConfigSection title="Pengaturan Regional" icon={Globe}>
        <ConfigRow
          label="Bahasa & Wilayah"
          description="Atur bahasa dan wilayah yang diinginkan"
        >
          <Select value={locale} onValueChange={setLocale}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pilih bahasa" />
            </SelectTrigger>
            <SelectContent>
              {LOCALES.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ConfigRow>
        <ConfigRow
          label="Hari pertama dalam seminggu"
          description="Pilih hari pertama dalam seminggu"
        >
          <Select
            value={firstDayOfWeek.toString()}
            onValueChange={(value) =>
              setFirstDayOfWeek(parseInt(value) as 0 | 1 | 2 | 3 | 4 | 5 | 6)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {localizedDays.map((day) => (
                <SelectItem key={day.value} value={day.value.toString()}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ConfigRow>
      </ConfigSection>
    </div>
  );
};

const CalendarSettings = ({
  viewSettings,
  updateDayViewConfig,
  updateDaysViewConfig, // Tambah handler untuk days view
  updateWeekViewConfig,
  updateMonthViewConfig,
  updateYearViewConfig,
}: {
  viewSettings: CalendarViewConfigs;
  updateDayViewConfig: (config: Partial<DayViewConfig>) => void;
  updateDaysViewConfig: (config: Partial<daysViewConfig>) => void;
  updateWeekViewConfig: (config: Partial<WeekViewConfig>) => void;
  updateMonthViewConfig: (config: Partial<MonthViewConfig>) => void;
  updateYearViewConfig: (config: Partial<YearViewConfig>) => void;
}) => (
  <div className="space-y-8">
    <ConfigSection title="Tampilan Hari" icon={Clock}>
      <ConfigRow
        label="Indikator waktu saat ini"
        description="Tampilkan garis merah pada waktu saat ini"
      >
        <Switch
          checked={viewSettings.day.showCurrentTimeIndicator}
          onCheckedChange={(checked) =>
            updateDayViewConfig({ showCurrentTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Indikator waktu saat hover"
        description="Tampilkan waktu saat hover di atas slot waktu"
      >
        <Switch
          checked={viewSettings.day.showHoverTimeIndicator}
          onCheckedChange={(checked) =>
            updateDayViewConfig({ showHoverTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Klik slot waktu untuk membuat acara"
        description="Izinkan mengklik slot waktu untuk membuat acara baru"
      >
        <Switch
          checked={viewSettings.day.enableTimeSlotClick}
          onCheckedChange={(checked) =>
            updateDayViewConfig({ enableTimeSlotClick: checked })
          }
        />
      </ConfigRow>
    </ConfigSection>
    <Separator />
    <ConfigSection title="Tampilan Banyak Hari" icon={CalendarDays}>
      <ConfigRow
        label="Sorot hari ini"
        description="Sorot kolom hari ini"
      >
        <Switch
          checked={viewSettings.days.highlightToday}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ highlightToday: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Indikator waktu saat ini"
        description="Tampilkan garis merah pada waktu saat ini"
      >
        <Switch
          checked={viewSettings.days.showCurrentTimeIndicator}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ showCurrentTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Indikator waktu saat hover"
        description="Tampilkan waktu saat hover di atas slot waktu"
      >
        <Switch
          checked={viewSettings.days.showHoverTimeIndicator}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ showHoverTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Klik slot waktu untuk membuat acara"
        description="Izinkan mengklik slot waktu untuk membuat acara baru"
      >
        <Switch
          checked={viewSettings.days.enableTimeSlotClick}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ enableTimeSlotClick: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Klik blok waktu untuk membuat acara"
        description="Izinkan mengklik blok waktu untuk membuat acara baru"
      >
        <Switch
          checked={viewSettings.days.enableTimeBlockClick}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ enableTimeBlockClick: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Perluas acara multi-hari"
        description="Tampilkan acara multi-hari di beberapa kolom"
      >
        <Switch
          checked={viewSettings.days.expandMultiDayEvents}
          onCheckedChange={(checked) =>
            updateDaysViewConfig({ expandMultiDayEvents: checked })
          }
        />
      </ConfigRow>
    </ConfigSection>
    <Separator />
    <ConfigSection title="Tampilan Minggu" icon={CalendarDays}>
      <ConfigRow
        label="Sorot hari ini"
        description="Sorot kolom hari ini"
      >
        <Switch
          checked={viewSettings.week.highlightToday}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ highlightToday: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Indikator waktu saat ini"
        description="Tampilkan garis merah pada waktu saat ini"
      >
        <Switch
          checked={viewSettings.week.showCurrentTimeIndicator}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ showCurrentTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Indikator waktu saat hover"
        description="Tampilkan waktu saat hover di atas slot waktu"
      >
        <Switch
          checked={viewSettings.week.showHoverTimeIndicator}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ showHoverTimeIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Klik slot waktu untuk membuat acara"
        description="Izinkan mengklik slot waktu untuk membuat acara baru"
      >
        <Switch
          checked={viewSettings.week.enableTimeSlotClick}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ enableTimeSlotClick: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Klik blok waktu untuk membuat acara"
        description="Izinkan mengklik blok waktu untuk membuat acara baru"
      >
        <Switch
          checked={viewSettings.week.enableTimeBlockClick}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ enableTimeBlockClick: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Perluas acara multi-hari"
        description="Tampilkan acara multi-hari di beberapa kolom"
      >
        <Switch
          checked={viewSettings.week.expandMultiDayEvents}
          onCheckedChange={(checked) =>
            updateWeekViewConfig({ expandMultiDayEvents: checked })
          }
        />
      </ConfigRow>
    </ConfigSection>
    <Separator />
    <ConfigSection title="Tampilan Bulan" icon={CalendarDays}>
      <ConfigRow
        label="Batas acara per hari"
        description="Jumlah maksimum acara yang ditampilkan sebelum indikator +lebih banyak"
      >
        <Input
          type="number"
          value={viewSettings.month.eventLimit}
          onChange={(e) =>
            updateMonthViewConfig({ eventLimit: parseInt(e.target.value) })
          }
          className="w-20 text-center"
          min={1}
          max={10}
        />
      </ConfigRow>
      <ConfigRow
        label="Tampilkan indikator lebih banyak acara"
        description="Tampilkan +X lebih banyak saat acara melebihi batas"
      >
        <Switch
          checked={viewSettings.month.showMoreEventsIndicator}
          onCheckedChange={(checked) =>
            updateMonthViewConfig({ showMoreEventsIndicator: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Sembunyikan hari di luar bulan"
        description="Sembunyikan hari dari bulan sebelumnya/selanjutnya"
      >
        <Switch
          checked={viewSettings.month.hideOutsideDays}
          onCheckedChange={(checked) =>
            updateMonthViewConfig({ hideOutsideDays: checked })
          }
        />
      </ConfigRow>
    </ConfigSection>
    <Separator />
    <ConfigSection title="Tampilan Tahun" icon={Sun}>
      <ConfigRow
        label="Tampilkan label bulan"
        description="Tampilkan nama bulan di tampilan tahun"
      >
        <Switch
          checked={viewSettings.year.showMonthLabels}
          onCheckedChange={(checked) =>
            updateYearViewConfig({ showMonthLabels: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Tampilan per kuartal"
        description="Kelompokkan bulan berdasarkan kuartal alih-alih grid 12 bulan"
      >
        <Switch
          checked={viewSettings.year.quarterView}
          onCheckedChange={(checked) =>
            updateYearViewConfig({ quarterView: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Sorot bulan ini"
        description="Tampilkan bulan ini dengan penekanan di tampilan tahun"
      >
        <Switch
          checked={viewSettings.year.highlightCurrentMonth}
          onCheckedChange={(checked) =>
            updateYearViewConfig({ highlightCurrentMonth: checked })
          }
        />
      </ConfigRow>
      <ConfigRow
        label="Tampilkan pratinjau acara"
        description="Tampilkan indikator acara di tampilan tahun"
      >
        <Switch
          checked={viewSettings.year.enableEventPreview}
          onCheckedChange={(checked) =>
            updateYearViewConfig({ enableEventPreview: checked })
          }
        />
      </ConfigRow>
      {viewSettings.year.enableEventPreview && (
        <>
          <ConfigRow
            label="Pratinjau acara per bulan"
            description="Jumlah maksimum acara yang ditampilkan per bulan di tampilan tahun"
          >
            <Input
              type="number"
              value={viewSettings.year.previewEventsPerMonth}
              onChange={(e) =>
                updateYearViewConfig({
                  previewEventsPerMonth: parseInt(e.target.value),
                })
              }
              className="w-20 text-center"
              min={1}
              max={10}
            />
          </ConfigRow>
          <ConfigRow
            label="Tampilkan indikator lebih banyak acara"
            description="Tampilkan +X lebih banyak saat acara melebihi batas"
          >
            <Switch
              checked={viewSettings.year.showMoreEventsIndicator}
              onCheckedChange={(checked) =>
                updateYearViewConfig({ showMoreEventsIndicator: checked })
              }
            />
          </ConfigRow>
        </>
      )}
    </ConfigSection>
  </div>
);
