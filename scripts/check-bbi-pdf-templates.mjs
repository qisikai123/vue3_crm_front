import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const baseTemplate = readFileSync(
  join(root, "src/assets/html/BBI_base.html"),
  "utf8"
);
const twoTermsTemplate = readFileSync(
  join(root, "src/assets/html/twoT&C.html"),
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

const productTemplates = [
  "src/assets/html/basic/businessBroadbandBasic.html",
  "src/assets/html/m-elite/BBI_m-Elite.html"
];

const failures = [];

function expectIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    failures.push(`${label} is missing: ${expected}`);
  }
}

function getSection(content, startMarker, endMarker, label) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker, start + startMarker.length);

  if (start === -1 || end === -1) {
    failures.push(`${label} section markers were not found`);
    return "";
  }

  return content.slice(start, end);
}

expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner.vas-table",
  "BBI_base.html"
);
expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner.premium-table",
  "BBI_base.html"
);
expectIncludes(baseTemplate, ".premium-table-block", "BBI_base.html");

const vasTableRule = baseTemplate.match(
  /\.custom-table-thin-inner\.vas-table\s*\{(?<body>[^}]+)\}/
);
const vasTableRuleBody = vasTableRule?.groups?.body ?? "";

expectIncludes(vasTableRuleBody, "-fs-table-paginate: paginate;", "vas-table");
expectIncludes(vasTableRuleBody, "border-top: 1px solid #000;", "vas-table");

expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner.premium-table tbody td",
  "BBI_base.html"
);

const premiumTableBlockRule = baseTemplate.match(
  /\.premium-table-block\s*\{(?<body>[^}]+)\}/
);
const premiumTableBlockRuleBody = premiumTableBlockRule?.groups?.body ?? "";

expectIncludes(
  premiumTableBlockRuleBody,
  "page-break-inside: auto;",
  "premium-table-block"
);

const premiumTableBodyCellRule = baseTemplate.match(
  /\.custom-table-thin-inner\.premium-table tbody td\s*\{(?<body>[^}]+)\}/
);
const premiumTableBodyCellRuleBody =
  premiumTableBodyCellRule?.groups?.body ?? "";

expectIncludes(
  premiumTableBodyCellRuleBody,
  "border-top: 1px solid #000;",
  "premium-table body cells"
);

if (/border-bottom\s*:/i.test(premiumTableBodyCellRuleBody)) {
  failures.push("premium-table body cells should not override bottom borders");
}

if (
  /\.custom-table-thin-inner\.premium-table\s*\{[^}]*-fs-table-paginate/i.test(
    baseTemplate
  )
) {
  failures.push("premium-table should not enable -fs-table-paginate");
}

if (
  /\.custom-table-thin-inner\.premium-table\s*\{[^}]*border-collapse:\s*collapse/i.test(
    baseTemplate
  )
) {
  failures.push("premium-table should keep the shared separate border model");
}

if (
  /\.custom-table-thin-inner\.premium-table th,\s*\.custom-table-thin-inner\.premium-table td\s*\{[^}]*border:\s*1px solid #000/i.test(
    baseTemplate
  )
) {
  failures.push("premium-table should only add top borders to body cells");
}

if (/\.custom-table-thin-inner\.premium-table thead th\s*\{/i.test(baseTemplate)) {
  failures.push("premium-table should not override header cell borders");
}
expectIncludes(
  baseTemplate,
  ".product-table-block + .product-table-block",
  "BBI_base.html"
);
expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner .no-table tr > td:first-child",
  "BBI_base.html"
);
expectIncludes(
  baseTemplate,
  ".custom-table-thin-inner .no-table tr > td:last-child",
  "BBI_base.html"
);
expectIncludes(
  twoTermsTemplate,
  'class="terms-flow-body tcContent page-break"\n  style="border-top: 1px solid #000; margin-top: 10px"',
  "twoT&C.html"
);
const twoTermsPageBreakBodyCount = (
  twoTermsTemplate.match(/class="terms-flow-body tcContent page-break"/g) ?? []
).length;
const twoTermsPageBreakMarginCount = (
  twoTermsTemplate.match(
    /style="border-top: 1px solid #000; margin-top: 10px"/g
  ) ?? []
).length;

if (twoTermsPageBreakBodyCount !== 3) {
  failures.push(
    `twoT&C.html should keep 3 original page-break terms sections, found ${twoTermsPageBreakBodyCount}`
  );
}

if (twoTermsPageBreakMarginCount !== 3) {
  failures.push(
    `twoT&C.html should add margin-top to 3 page-break terms sections, found ${twoTermsPageBreakMarginCount}`
  );
}

if (/terms-flow-body-continuing|terms-flow-body-final-continuation/.test(twoTermsTemplate)) {
  failures.push("twoT&C.html should not use continuation classes");
}

if (/<!--\s*<div[\s\S]*terms-flow-body/.test(twoTermsTemplate)) {
  failures.push("twoT&C.html should not leave terms sections commented out");
}

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

  if (
    /class="custom-table custom-table-thin-inner custom-table2 charge-table vas-table"[\s\S]*?style="[^"]*border-bottom:\s*1px solid #000/i.test(
      content
    )
  ) {
    failures.push(
      `${templatePath} should rely on row borders instead of table border-bottom`
    );
  }
}

for (const templatePath of productTemplates) {
  const content = readFileSync(join(root, templatePath), "utf8");
  const productSection = getSection(
    content,
    "<!-- 表格2: Product(s) / Service(s) -->",
    "<!-- 表格3:",
    `${templatePath} Product(s)`
  );
  const premiumSection = getSection(
    content,
    "<!-- 表格4: Premium(s) -->",
    "<!-- 表格5:",
    `${templatePath} Premium(s)`
  );

  expectIncludes(content, "product-table-block", templatePath);
  expectIncludes(
    premiumSection,
    "table-block table-block-joined premium-table-block",
    `${templatePath} Premium(s)`
  );
  expectIncludes(
    premiumSection,
    "charge-table premium-table",
    `${templatePath} Premium(s)`
  );

  if (productSection.includes("premium-table")) {
    failures.push(`${templatePath} Product(s) table should not use premium-table`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
