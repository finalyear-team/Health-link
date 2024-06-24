import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Patients Consulted</CardTitle>
            <CardDescription>Total number of patients seen</CardDescription>
          </div>
          <CardTitle> 21 </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Gross revenue generated</CardDescription>
          </div>
          <CardTitle> $21 </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Followers</CardTitle>
            <CardDescription>Total number of followers</CardDescription>
          </div>
          <CardTitle> 21 </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Likes</CardTitle>
            <CardDescription>Total number of likes on posts </CardDescription>
          </div>
          <CardTitle> 21 </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Questions Answered</CardTitle>
            <CardDescription>
              Total number of questions answered
            </CardDescription>
          </div>
          <CardTitle> 21 </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Blog Performance</CardTitle>
            <CardDescription>
              Metrics for the doctor&apos;s blog
            </CardDescription>
          </div>
          <CardTitle> 21 </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

// function BarChart(props: any) {
//   return (
//     <div {...props}>
//       <ResponsiveBar
//         data={[
//           { name: "Jan", count: 111 },
//           { name: "Feb", count: 157 },
//           { name: "Mar", count: 129 },
//           { name: "Apr", count: 150 },
//           { name: "May", count: 119 },
//           { name: "Jun", count: 72 },
//         ]}
//         keys={["count"]}
//         indexBy="name"
//         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//         padding={0.3}
//         colors={["#2563eb"]}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 4,
//           tickPadding: 16,
//         }}
//         gridYValues={4}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",

//             },
//           },
//         }}
//         tooltipLabel={({ id }) => `${id}`}
//         enableLabel={false}
//         role="application"
//         ariaLabel="A bar chart showing data"
//       />
//     </div>
//   );
// }
function BarChart(props: any) {
  const { theme } = useTheme();

  const darkMode = theme === "light" ? false : true;

  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={darkMode ? ["#0a71eb"] : ["#2563eb"]}
        axisBottom={{
          tickSize: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: darkMode ? "#e5e7eb" : "#000",
              },
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#e5e7eb" : "#000",
            },
          },
          grid: {
            line: {
              stroke: darkMode ? "#374151" : "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function LineChart(props: any) {
  const { theme } = useTheme();

  const darkMode = theme === "light" ? false : true;
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#e5e7eb" : "#000",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
