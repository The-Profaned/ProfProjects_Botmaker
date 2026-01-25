declare namespace javax.swing {
    export class JDialog extends java.awt.Component {
        constructor(owner: javax.swing.JFrame, title: string, modal: boolean);
        setTitle(title: string): void;
        getTitle(): string;
        setModal(modal: boolean): void;
        isModal(): boolean;
        setResizable(resizable: boolean): void;
        isResizable(): boolean;
        setDefaultCloseOperation(operation: JFrameCloseOperation): void;
        setLocationRelativeTo(component: java.awt.Component | null): void;
        setContentPane(contentPane: JPanel): void;
        getContentPane(): JPanel;
        setVisible(visible: boolean): void;
        isVisible(): boolean;
        pack(): void;
        dispose(): void;
        repaint(): void;
        setPreferredSize(dimension: java.awt.Dimension): void;
        getPreferredSize(): java.awt.Dimension;
        setMinimumSize(dimension: java.awt.Dimension): void;
        getMinimumSize(): java.awt.Dimension;
        setMaximumSize(dimension: java.awt.Dimension): void;
        getMaximumSize(): java.awt.Dimension;
        setSize(dimension: java.awt.Dimension): void;
    }
}

