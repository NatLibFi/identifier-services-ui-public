import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

function MonographPublisherDataEntry({ heading, value }: { heading: string; value?: string[] | string | null }) {
  const valueIsArray = Array.isArray(value);
  const arrayContainsValues = valueIsArray && value.length > 0;

  return (
    <div>
      <NatlibfiHeading size={'m'} className="mb-0">
        {heading}
      </NatlibfiHeading>

      {/* Non-arrays */}
      {!valueIsArray && <NatlibfiBodyText className="wrap-anywhere">{value || '-'}</NatlibfiBodyText>}

      {/* Arrays */}
      {valueIsArray && !arrayContainsValues && <NatlibfiBodyText className="wrap-anywhere">-</NatlibfiBodyText>}

      {valueIsArray && arrayContainsValues && (
        <ul className="list-inside list-disc">
          {value.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MonographPublisherDataEntry;
