import {Card, CardContent} from "@/components/ui/card";
import {BarChart, PieChart, TrendingUpIcon, QrCodeIcon, SmartphoneIcon} from "lucide-react";

export default function QRStatistics() {

    return (
        <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-lg font-bold mb-4">QR 코드 통계 & 트렌드</h3>

            <div className="space-y-3">
                <Card className="bg-muted/30">
                    <CardContent className="p-3">
                        <div className="flex items-center">
                            <TrendingUpIcon size={18} className="mr-2 text-primary"/>
                            <p className="text-sm">2024년 QR 코드 스캔 횟수 <span className="font-bold">43%</span> 증가</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30">
                    <CardContent className="p-3">
                        <div className="flex items-center">
                            <SmartphoneIcon size={18} className="mr-2 text-primary"/>
                            <p className="text-sm">스마트폰 사용자의 <span className="font-bold">92%</span>가 QR 코드 인식 가능</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30">
                    <CardContent className="p-3">
                        <div className="flex items-center">
                            <QrCodeIcon size={18} className="mr-2 text-primary"/>
                            <p className="text-sm">매장 방문객의 <span className="font-bold">67%</span>가 QR 메뉴 선호</p>
                        </div>
                    </CardContent>
                </Card>


                <Card className="bg-muted/30">
                    <CardContent className="p-3">
                        <div className="flex items-center">
                            <BarChart size={18} className="mr-2 text-primary"/>
                            <p className="text-sm">디지털 마케팅에서 QR 코드 활용 <span className="font-bold">58%</span> 증가</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30">
                    <CardContent className="p-3">
                        <div className="flex items-center">
                            <PieChart size={18} className="mr-2 text-primary"/>
                            <p className="text-sm">소매업체의 <span className="font-bold">78%</span>가 QR 결제 시스템 도입</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
                <p>* 2024년 글로벌 QR 코드 사용 보고서 기준</p>
            </div>
        </div>
    );
}