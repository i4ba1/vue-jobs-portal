// components.d.ts
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VaButton: typeof import("vuestic-ui")["VaButton"];
    VaInput: typeof import("vuestic-ui")["VaInput"];
    VaCheckbox: typeof import("vuestic-ui")["VaCheckbox"];
    VaCard: typeof import("vuestic-ui")["VaCard"];
    VaCardContent: typeof import("vuestic-ui")["VaCardContent"];
    VaCardTitle: typeof import("vuestic-ui")["VaCardTitle"];
    VaAlert: typeof import("vuestic-ui")["VaAlert"];
  }
}

export {};