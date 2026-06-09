import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const baseTemplate = readFileSync(
  join(root, "src/assets/html/BBI_base.html"),
  "utf8"
);

const vasTemplates = [
  "src/assets/html/basic/advanced_email.html",
  "src/assets/html/basic/cloud_storage.html",
  "src/assets/html/basic/mesh_wifi_router.html",
  "src/assets/html/basic/web_security_enterprise.html",
  "src/assets/html/basic/web_security_lite.html",
  "src/assets/html/basic/wireless_plus_service.html",
  "src/assets/html/basic/wireless_service.html",
  "src/assets/html/m-elite/m-Elite-advanced_email.html",
  "src/assets/html/m-elite/m-Elite-mesh_wifi_router.html"
];

const failures = [];

function expectIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    failures.push(`${label} is missing: ${expected}`);
  }
}

expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner.vas-table",
  "BBI_base.html"
);

const vasTableRule = baseTemplate.match(
  /\.custom-table-thin-inner\.vas-table\s*\{(?<body>[^}]+)\}/
);
const vasTableRuleBody = vasTableRule?.groups?.body ?? "";

expectIncludes(vasTableRuleBody, "-fs-table-paginate: paginate;", "vas-table");
expectIncludes(vasTableRuleBody, "border-top: 1px solid #000;", "vas-table");

for (const templatePath of vasTemplates) {
  const content = readFileSync(join(root, templatePath), "utf8");

  expectIncludes(
    content,
    "custom-table custom-table-thin-inner custom-table2 charge-table vas-table",
    templatePath
  );

  if (/style="[^"]*border-top:\s*none/i.test(content)) {
    failures.push(`${templatePath} still disables the VAS table top border`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
