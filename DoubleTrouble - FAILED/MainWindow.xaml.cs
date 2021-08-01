using System;
using System.Windows;
using System.Windows.Media;
using System.Windows.Shapes;
using System.Windows.Controls;
using System.Windows.Threading;

namespace DoubleTrouble {
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window {
        public MainWindow() {
            InitializeComponent();
            DispatcherTimer dispatcherTimer = new();
            dispatcherTimer.Tick += new EventHandler(Loop);
            dispatcherTimer.Interval = TimeSpan.FromMilliseconds(20);
            dispatcherTimer.Start();
            _ = DrawingCanvas.Children.Add(newEllipse);

        }

        private double a;
        private readonly Ellipse newEllipse = new() {
            Stroke = new SolidColorBrush(Color.FromRgb(0, 87, 158)),
            StrokeThickness = 3,
            Fill = new SolidColorBrush(Color.FromRgb(0, 122, 222)),
            Width = 32,
            Height = 32
        };

        private void Loop(object obj, EventArgs arg) {
            a = a + 0.07 > Math.PI * 2 ? 0 : a + 0.07;
            Point clickPoint = new((Math.Sin(a) * 100) + 200, (Math.Cos(a) * 100) + 200);
            Canvas.SetLeft(newEllipse, clickPoint.X);
            Canvas.SetTop(newEllipse, clickPoint.Y);
        }

    }
}