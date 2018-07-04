namespace Infrastructure
{
    public interface IConnectionFactory
    {
        string DatabaseConnectionString { get; }
    }
}
